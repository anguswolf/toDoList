import { activityStatus } from '../const/const.js';
import ForbiddenException from '../exception/ForbiddenException.js';
import NotFoundException from '../exception/NotFoundException.js';
import { activityModel } from '../schema/activitySchema.js';
const addActivity = async (data) => {
  data.ownerId = data.userId;
  const result = await new activityModel(data).save()
  return result.toJSON({versionKey: false})
}

const removeActivity = async (id) => {
  const activity = await activityModel.findById(id);
  if (activity.status === activityStatus.deleted) {
    throw new ForbiddenException("Activity already deleted");
  }
  return await updateActivity(id, {status: status.deleted})
}

const updateActivity = async (id, params) => {
  const activity = await activityModel.findById(id);
  if (!activity) {
    throw new NotFoundException('Activity not found',200100) 
  }
  if (activity.status === activityStatus.deleted) {
    throw new ForbiddenException("Cannot update deleted activity");
  }
  const res = await activityModel.findOneAndUpdate(
    {_id:id},
    params,
    {upsert:false, new:true});
  return res?.toJSON({versionKey:false}) || res;
}
const retrieveActivity = async (id) => {
  const res = await activityModel.findById(id)
  return res?.toJSON({versionKey:false}) || res;
}

const completedActivity = async (id, userId) => {
  if(!(id && userId)){return null}
  const activity = await activityModel.findOneAndUpdate({_id:id,ownerId:userId},{$set:{status:activityStatus.completed}},{upsert:false,new:true})
  return activity?.toJSON({versionKey:false}) || null
}

const uncompletedActivity = async (id, userId) => {
  if(!(id && userId)){return null}
  const activity = await activityModel.findOneAndUpdate({_id:id,ownerId:userId,status:activityStatus.completed},{$set:{status:activityStatus.open}},{upsert:false,new:true})
  return activity?.toJSON({versionKey:false}) || null
}

const archivedActivity = async (id, userId) => {
  if(!(id && userId)){return null}
  const activity = await activityModel.findOneAndUpdate({_id:id,ownerId:userId,status:activityStatus.completed},{$set:{status:activityStatus.archived}},{upsert:false,new:true})
  return activity?.toJSON({versionKey:false}) || null
}

const retrieveActivities = async () => {
  //console.log('test')
  const res = await activityModel.findAll()
  //console.log(res)
  return res
  
}


export default {
  addActivity,
  updateActivity,
  removeActivity,
  retrieveActivity,
  completedActivity,
  uncompletedActivity,
  archivedActivity,
  retrieveActivities,

}
