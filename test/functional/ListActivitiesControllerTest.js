import * as chai from 'chai';
import {expect, use} from 'chai';
import mongoose from 'mongoose'
import app from '../../server.js';
import { activityStatus } from '../../src/const/const.js';
import CryptoUtils from '../../src/utils/cryptoUtils.js';
import {userFixtures} from '../fixture/userFixtures.js'
import {activityFixtures} from '../fixture/activityFixtures.js'
import {default as chaiHttp, request} from "chai-http";
chai.use(chaiHttp);

let user;
let token;
let activity;

const listUserActivities = [];

const buildPath = () => {
    return '/activity/'; //Refactor in tutti i test
}
Mocha.process.removeListener("uncaughtException");

describe('----- List Activity Controller Tests -----', () => {
    beforeEach(async () => {
        user = await userFixtures.addUserInDb();
        
        for (let index = 0; index < 3; index++) {
            listUserActivities.push(await activityFixtures.addActivityToDb(user._id))   
        }
        token = CryptoUtils.generateTokens(user);
    });

    afterEach(async () => {
        await userFixtures.restore();
        await activityFixtures.restore();
    })


    describe('/GET List Activity Failure', () => {

        it('it should return 401 when no Token is provided', async () => {
            const res = await request.execute(app)
            .get(buildPath())
            .set('Content-type', 'application/json')
            .send();
            const error = JSON.parse(res.error.text);
            expect(res.status).eq(401);
            expect(error.message).eq('Authentication error. Token required.')
        });
        
        it('it should return 401 when invalid Token is provided', async () => {
            const res = await request.execute(app)
            .get(buildPath())
            .set('Authorization', 'Bearer ' + 'invalid Token')
            .set('Content-type', 'application/json')
            .send();
            const error = JSON.parse(res.error.text);
            expect(res.status).eq(401);
            expect(error.message).eq('Authentication error. Invalid token.Invalid JWT')
        });
    });

    describe('/GET List Activity Success', () => {
        it.only('it should return 200 and return an empty array if user has no activities', async () => {
            const res = await request.execute(app)
            .get(buildPath())
            .set('Authorization', 'Bearer ' + token.accessToken)
            .set('Content-type', 'application/json')
            .send();
            expect(res.status).eq(200);
            expect(res.body).has.length(0);
           
        });

        it('it should return 200 and all users activities', async () => {
            const res = await request.execute(app)
            .get(buildPath())
            .set('Authorization', 'Bearer ' + token.accessToken)
            .set('Content-type', 'application/json')
            .send();
            expect(res.status).eq(200);
            expect(res.body).has.length(3);
           
        });
    });
    
});