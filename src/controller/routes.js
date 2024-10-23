/**
 * VALIDATORS
 */
import createActivityValidator from '../validator/activity/createValidator.js'
import updateActivityValidator from '../validator/activity/updateValidator.js'
import createUserValidator from '../validator/user/createValidator.js'
import loginValidator from '../validator/user/loginValidator.js'
/**
 * ACTIVITY CONTROLLERS
*/
import addActivityController from './activity/addActivityController.js'
import retrieveActivityController from './activity/retrieveActivityController.js'
import removeActivityController from './activity/removeActivityController.js'
import updateActivityController from './activity/updateActivityController.js'
import completeActivityController from './activity/completeActivityController.js'
/**
 * USER CONTROLLERS
*/
import createUserController from './user/createUserController.js'
import checkUserMailController from './user/checkUserMailController.js'
import loginController from './user/loginController.js';
/**
 * MIDDLEWARES
 */
import checkAuthorizationMiddleware from '../middleware/checkAuthorizationMiddleware.js'
import setActivityStatusCompleted from '../middleware/setActivityStatusCompleted.js'

const setup = (app) => {
    app.get('/activity/:id',checkAuthorizationMiddleware, retrieveActivityController);
    app.post('/activity',checkAuthorizationMiddleware, createActivityValidator, addActivityController);
    app.patch('/activity/:id',checkAuthorizationMiddleware, updateActivityValidator, updateActivityController);
    app.delete('/activity/:id',checkAuthorizationMiddleware, removeActivityController);
    //definire app.use dopo la route app.post, app.patch
    app.post('/user', createUserValidator, createUserController);
    app.get('/user/:id/confirm/:registrationToken',checkUserMailController);
    app.post('/user/login', loginValidator, loginController)
    //app.patch('/:id/complete',checkAuthorizationMiddleware,updateActivityValidator,completeActivityController)
    app.patch('/:id/complete',checkAuthorizationMiddleware,updateActivityValidator,setActivityStatusCompleted,updateActivityController)
    app.use((err, req, res, next) => {
        if (err && err.error && err.error.isJoi) {
            res.status(400).json({
                type: err.type,
                message: err.error.toString()
            })

        } else {
            next(err);
        }
    })
}

export default setup;