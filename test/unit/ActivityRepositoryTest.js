import {expect} from 'chai';
import { activityStatus } from '../../src/const/const.js';
import activityRepository from '../../src/repository/activityRepository.js';
import { activityModel } from '../../src/schema/activitySchema.js';
import mongoose from 'mongoose';
import sinon from 'sinon';

const objId = mongoose.Types.ObjectId;
const sandbox = sinon.createSandbox();

describe('----- Activity Repository Tests -----', () => {
    it('it should set activity status to completed', async () => {
      const userId = new objId();
      const activity = {
        _id: new objId(),
        name: 'olio di r2d2',
        description: 'controllare olio r2d2 dopo la passeggiata su Tatooine',
        dueDate: new Date(),
        status: activityStatus.open,
        ownerId: userId,
      }
      sandbox.stub(activityModel, 'findOneAndUpdate').callsFake(() => {
        activity.status = activityStatus.completed
        activity.toJSON = () => activity
        return activity;
      });
      const completedActivity = await activityRepository.complete(activity._id, userId)
      expect(completedActivity.status).eq(activityStatus.completed);
      expect(completedActivity.ownerId).eq(userId);
      sandbox.restore();
    });
});