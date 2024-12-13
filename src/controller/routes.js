/**
 * VALIDATORS
 */
import createActivityValidator from '../validator/activity/createValidator.js'
import updateActivityValidator from '../validator/activity/updateValidator.js'
import createUserValidator from '../validator/user/createValidator.js'
import loginValidator from '../validator/user/loginValidator.js'
import changeStatusValidator from '../validator/activity/changeStatusValidator.js'
import getValidator from '../validator/activity/getValidator.js'
/**
 * ACTIVITY CONTROLLERS
*/
import addActivityController from './activity/addActivityController.js'
import retrieveActivityController from './activity/retrieveActivityController.js'
import removeActivityController from './activity/removeActivityController.js'
import updateActivityController from './activity/updateActivityController.js'
import completeActivityController from './activity/completeActivityController.js'
import uncompleteActivityController from './activity/uncompleteActivityController.js'
import archiveActivityController from './activity/archiveActivityController.js'
import listActivityController from './activity/listActivityController.js'
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
import checkIdMiddleware from '../middleware/checkIdMiddleware.js'
//import flushAndSetActivityStatusCompleted from '../middleware/flushAndSetActivityStatusCompleted.js'

const setup = (app) => {
    app.get('/activities/',checkAuthorizationMiddleware, listActivityController);
    app.get('/activities/:id', checkAuthorizationMiddleware,/* getValidator, */ checkIdMiddleware, retrieveActivityController);
    app.post('/activities',checkAuthorizationMiddleware, createActivityValidator, addActivityController);
    app.patch('/activities/:id',checkAuthorizationMiddleware, updateActivityValidator, updateActivityController);
    app.delete('/activities/:id',checkAuthorizationMiddleware, removeActivityController);
    app.post('/users', createUserValidator, createUserController);
    app.get('/users/:id/confirm/:registrationToken',checkUserMailController);
    app.post('/users/login', loginValidator, loginController)
    //TODO unire i patch in un unico endpoint
    app.patch('/activities/:id/complete',checkAuthorizationMiddleware,changeStatusValidator,completeActivityController)
    app.patch('/activities/:id/uncomplete',checkAuthorizationMiddleware,changeStatusValidator, uncompleteActivityController)
    app.patch('/activities/:id/archive',checkAuthorizationMiddleware,changeStatusValidator, archiveActivityController)
    
    //definire app.use dopo la route app.post, app.patch
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