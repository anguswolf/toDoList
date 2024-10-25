import { userModel } from '../../src/schema/userSchema.js';

class UserFixtures {
  async addUserInDb (data) {
    const user = data || {
      displayName: 'Fake User',
      email: 'fake@test.com',
      password:'myPass'
    }
    const userDoc =  await userModel.create(user);
    return userDoc.toJSON({flattenObjectIds:true, versionKey:false})
  }

  async restore() {
    await userModel.deleteMany();
  }
}

export const userFixtures = new UserFixtures();