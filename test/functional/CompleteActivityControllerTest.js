import chai from 'chai';
import chaiHttp from 'chai-http';
import {expect} from 'chai';
import mongoose from 'mongoose'
import app from '../../server.js';
import { activityStatus } from '../../src/const/index.js';
import CryptoUtils from '../../src/utils/cryptoUtils.js';
import {userFixtures} from '../fixture/userFixtures.js'
import {activityFixtures} from '../fixture/activityFixtures.js'
chai.use(chaiHttp);

let user;
let token;
let activity;

describe('----- Complete Activity Controller Tests -----', () => {
    beforeEach(async () => {
        user = await userFixtures.addUserInDb();
        activity = await activityFixtures.addActivityToDb(user._id);
        token = CryptoUtils.generateTokens(user);
    });

    afterEach(async () => {
        await userFixtures.restore();
        await activityFixtures.restore();
    })


    describe('/PATCH Complete Activity Failure', () => {
        it('it should return 404 when activity does not exists', async () => {
            const res = await chai.request(app)
            .patch(`/${new mongoose.Types.ObjectId()}/complete`)
            .set('Authorization', 'Bearer ' + token.accessToken)
            .send();
            const error = JSON.parse(res.error.text);
            expect(res.status).eq(404);
            expect(error.message).eq('Activity not found')
            expect(error.code).eq(200100)
        });
    });
    
});