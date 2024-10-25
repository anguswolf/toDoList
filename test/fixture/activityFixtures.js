import { activityStatus } from '../../src/const/const.js';
import { activityModel } from '../../src/schema/activitySchema.js';

class ActivityFixtures {
  async addActivityToDb (userId, data) {
    const activity = data || {
      name: 'olio di r2d2',
      description: 'controllare olio r2d2 dopo la passeggiata su Tatooine',
      dueDate: new Date(),
      status: activityStatus.open,
      ownerId: userId
    }
    const activityDoc = await activityModel.create(activity);
    return activityDoc.toJSON({flattenObjectIds:true, versionKey:false})
  }

  async restore() {
    await activityModel.deleteMany();
  }
}

export const activityFixtures = new ActivityFixtures();