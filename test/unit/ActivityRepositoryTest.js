import {expect} from 'chai';
import { activityStatus } from '../../src/const/const.js';
import activityRepository from '../../src/repository/activityRepository.js';
import { activityModel } from '../../src/schema/activitySchema.js';
import mongoose from 'mongoose';
import sinon from 'sinon';

const objId = mongoose.Types.ObjectId;
const sandbox = sinon.createSandbox();

describe('----- Activity Repository Success Tests -----', () => {
    it('it should set activity status to completed', async () => {
      const userId = new objId();
      const activity = {
        _id: new objId().toString(),
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
      const completedActivity = await activityRepository.completedActivity(activity._id, userId)
      expect(completedActivity.status).eq(activityStatus.completed);
      expect(completedActivity.ownerId).eq(userId);
      expect(completedActivity._id.toString()).eq(activity._id.toString());
      expect(completedActivity.description).eq(activity.description);
      sandbox.restore();
    });
});

describe('----- Activity Repository Failure Tests -----', () => {
  it('it should return null if no userId is provided', async () => {
    const activity = {
      _id: new objId().toString(),
      name: 'olio di r2d2',
      description: 'controllare olio r2d2 dopo la passeggiata su Tatooine',
      dueDate: new Date(),
      status: activityStatus.open,
      ownerId: '',
    }
    sandbox.stub(activityModel, 'findOneAndUpdate').callsFake(() => {
      activity.status = activityStatus.completed
      activity.toJSON = () => activity
      return activity;
    });
    const completedActivity = await activityRepository.completedActivity(activity._id)
    expect(completedActivity).eq(null);
    sandbox.restore();
  });

  it('it should return null if no Activity id is provided', async () => {
    const userId = new objId();
    const activity = {
      _id: new objId().toString(),
      name: 'olio di r2d2',
      description: 'controllare olio r2d2 dopo la passeggiata su Tatooine',
      dueDate: new Date(),
      status: activityStatus.open,
      ownerId: ''
    }
    sandbox.stub(activityModel, 'findOneAndUpdate').callsFake(() => {
      activity.status = activityStatus.completed
      activity.toJSON = () => activity
      return activity;
    });
    const completedActivity = await activityRepository.completedActivity(null,userId)
    expect(completedActivity).eq(null);
    sandbox.restore();
  });

  it('it should return null if no Activity is found on Db', async () => {
    const userId = new objId();
    const activity = {
      _id: new objId().toString(),
      name: 'olio di r2d2',
      description: 'controllare olio r2d2 dopo la passeggiata su Tatooine',
      dueDate: new Date(),
      status: activityStatus.open,
      ownerId: ''
    }
    sandbox.stub(activityModel, 'findOneAndUpdate').callsFake(() => {
      return null;
    });
    const completedActivity = await activityRepository.completedActivity(activity._id,userId)
    expect(completedActivity).eq(null);
    sandbox.restore();
  });

});

