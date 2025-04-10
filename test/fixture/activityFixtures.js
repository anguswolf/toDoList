import { activityStatus } from '../../src/const/const.js';
import { activityModel } from '../../src/schema/activitySchema.js';

class ActivityFixtures {
  async addActivityToDb (userId, data) {
    let activity =  {
      name: 'olio di r2d2',
      description: 'controllare olio r2d2 dopo la passeggiata su Tatooine',
      dueDate: new Date(),
      status: activityStatus.open,
      ownerId: userId
    }
    if (data) {
      activity = {...activity, ...data}
    }
    const activityDoc = await activityModel.create(activity);
    return activityDoc.toJSON({flattenObjectIds:true, versionKey:false})
  }

  async restore() {
    await activityModel.deleteMany();
  }
  async getFromDb(activityId){
    const activityDoc = await activityModel.findById(activityId)
    return activityDoc.toJSON({flattenObjectIds:true, versionKey:false})
  }

  async getByUser(ownerId){
    const activityDoc = await activityModel.find({ownerId:ownerId})
    return activityDoc.map(item => item.toJSON({ flattenObjectIds: true, versionKey: false }));
  }


}

export const activityFixtures = new ActivityFixtures();