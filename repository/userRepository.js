
import mongoose  from 'mongoose'
import { Schema }  from 'mongoose';
import MongoInternalException from '../exception/MongoInternalException.js';
import NotFoundException from '../exception/NotFoundException.js';
import UserAlreadyExistsException from '../exception/UserAlreadyExistException.js';
import { userStatus } from '../const/const.js';
const userSchema = new Schema({
    email: {type: String, index: { unique: true }},
    displayName: String,
    password: String,
    salt: String,
    registrationToken: String,
    status: { type: String, default: userStatus.pending },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      writeConcern: {w: 1, wtimeout: 2000},
    }
  }
);
const userModel = mongoose.model('users', userSchema);
const add = async (content) => {
  try {
    const res = await new userModel(content).save();
    const out = res.toJSON({versionKey:false})
    delete out.password;
    delete out.salt;
    delete out.registrationToken;
    return out
  } catch (e) {
    if(e.message.indexOf('E11000 duplicate key error') > -1) {
      throw new UserAlreadyExistsException(`user ${content.email} already exists`, 100100)
    }
    throw new MongoInternalException(e.message, 100101)
  }
}

const confirmRegistration = async (id, token) => {
    try {
      const result = await userModel.findOneAndUpdate(
        {_id: id, registrationToken: token},
        {
          status:userStatus.active,
          registrationToken: null
        },
        {new: true}
      )
      if(!result) {
        throw new NotFoundException('user not found', 100102)
      }
  
      if(result.status === userStatus.active) {
        const out = result.toJSON({versionKey:false})
        delete out.password;
        delete out.salt;
        delete out.registrationToken;
        return out
      }
  
    } catch (e) {
      if(e.code === 100102) {
        throw e
      }
      throw new MongoInternalException(e.message, 100103)
    }
  }

  const getByEmail = async (email) => {
    const result = await userModel.findOne({email:email, status: userStatus.active})
    if(!result) {
      throw new UnauthorizedException('login failed', 100104);
    }
    return result.toJSON({versionKey:false})
  }
  
  export default {
    add,
    confirmRegistration,
    getByEmail,
  }