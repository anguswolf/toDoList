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
  return await updateActivity(id, {status: activityStatus.deleted})
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

const listActivities = async (userId) => {
  
  //const res = await activityModel.findAll({ownerId: userId});
  const res = await activityModel.find({ownerId: userId});
  //console.log(res?.map(item => item.toJSON({versionKey:false})))
  //return activity?.toJSON({versionKey:false}) || null
  return res?.map(item => item.toJSON({versionKey:false}));
}

const _changeStatus = async (id, userId, status) => {
  if(!(id && userId)){return null}
  const activity = await activityModel.findOneAndUpdate({_id:id,ownerId:userId},{$set:{status}},{upsert:false,new:true})
  return activity?.toJSON({versionKey:false}) || null
}

const completedActivity = async (id, userId) => {
  return _changeStatus(id, userId, activityStatus.completed)
}

const uncompletedActivity = async (id, userId) => {
  return _changeStatus(id, userId, activityStatus.open)
}

const archiveActivity = async (id, userId) => {
  const activity = await activityModel.findOne({_id:id, ownerId:userId})
  if (activity) {
    switch (activity.status) {
      case activityStatus.archived:
        return activity?.toJSON({versionKey:false})
      
      case activityStatus.deleted:
        throw new ForbiddenException('Can not archive a deleted activity', 200221)
      
      case activityStatus.open:
        throw new ForbiddenException('Can not archive a not completed activity', 200220)
    
      default:
        return _changeStatus(id, userId, activityStatus.archived)    
    }
  
  }
      
  return null
}




export default {
  addActivity,
  updateActivity,
  removeActivity,
  retrieveActivity,
  completedActivity,
  uncompletedActivity,
  archiveActivity,
  listActivities,

}
