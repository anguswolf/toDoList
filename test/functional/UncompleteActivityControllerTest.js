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

describe('----- Uncomplete Activity Controller Tests -----', () => {
    beforeEach(async () => {
        user = await userFixtures.addUserInDb();
        //activity = await activityFixtures.addActivityToDb(user._id);
        activity = await activityFixtures.addActivityToDb(user._id,{status: activityStatus.completed});
        activity = await activityFixtures.addActivityToDb(user._id,{status: activityStatus.archived});
        activity = await activityFixtures.addActivityToDb(user._id,{status: activityStatus.completed});
        activity = await activityFixtures.addActivityToDb(user._id,{status: activityStatus.open});
        //activity = await activityFixtures.addActivityToDb(user._id,{status: activityStatus.archived});
        token = CryptoUtils.generateTokens(user);
    });

    afterEach(async () => {
        await userFixtures.restore();
        await activityFixtures.restore();
    })

    describe('/PATCH Uncomplete Activity Success', () => {
        it('it should return 200 and update the Status field to open', async () => {
            const res = await request.execute(app)
            .patch(`/activity/${activity._id}/uncomplete`)
            .set('Authorization', 'Bearer ' + token.accessToken)
            .set('Content-type', 'application/json')
            .send();
           /*  console.log(res.status);
            console.log(res.body); */
            expect(res.status).eq(200);
            expect(res.body.status).eq(activityStatus.open);
            const activityFromDb = await activityFixtures.getFromDb(activity._id);
            expect(activityFromDb).not.null;
            expect(activityFromDb.status).eq(activityStatus.open);
           
        });
    });

    describe('/PATCH Archive Activity Success', () => {
        it('it should return 200 and update the Status field to archived', async () => {
            const res = await request.execute(app)
            .patch(`/activity/${activity._id}/archive`)
            .set('Authorization', 'Bearer ' + token.accessToken)
            .set('Content-type', 'application/json')
            .send();
           /*  console.log(res.status);
            console.log(res.body); */
            expect(res.status).eq(200);
            expect(res.body.status).eq(activityStatus.archived);
            const activityFromDb = await activityFixtures.getFromDb(activity._id);
            expect(activityFromDb).not.null;
            expect(activityFromDb.status).eq(activityStatus.archived);
     
        });
    });

    describe('/GET Archive Activity Success', () => {
        it('it should return {} if the Status field is archived', async () => {
            const res = await request.execute(app)
            .get(`/activity/${activity._id}`)
            .set('Authorization', 'Bearer ' + token.accessToken)
            .set('Content-type', 'application/json')
            .send();
            /* console.log(res.status);
            console.log(res.body.status); */
            expect(res.status).eq(200);
            expect(res.body).to.deep.eq({});
            const activityFromDb = await activityFixtures.getFromDb(activity._id);
            expect(activityFromDb).not.null;
            expect(activityFromDb.status).eq(activityStatus.archived);
        
        });
    });    
   
    describe('/GET Activities Success', () => {
        it.only('it should return a list of non archived activities', async () => {
            const res = await request.execute(app)
            .get(`/activities`)
            .set('Authorization', 'Bearer ' + token.accessToken)
            .set('Content-type', 'application/json')
            .send();
            console.log(res.status);
            console.log("RESPONSE BODY: " + res.body);
            console.log(res.body);
            expect(res.status).eq(200);
            expect(res.body.status).not.eq(activityStatus.archived);
            const activityFromDb = await activityFixtures.getFromDb(activity._id);
            expect(activityFromDb).not.null;
            
           
        });
    });

});