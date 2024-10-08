/**
 * VALIDATORS
 */
import createActivityValidator from '../validator/activity/createValidator.js'
import updateActivityValidator from '../validator/activity/updateValidator.js'
import createUserValidator from '../validator/user/createValidator.js'

/**
 * ACTIVITY CONTROLLERS
 */
import addActivityController from './addActivityController.js'
import retrieveActivityController from './retrieveActivityController.js'
import removeActivityController from './removeActivityController.js'
import updateActivityController from './updateActivityController.js'

/**
 * USER CONTROLLERS
 */
import createUserController from './createUserController.js'
                                                                     
const setup = (app) => {
    app.get('/acitivity/:id', retrieveActivityController);
    app.post('/acitivity', createActivityValidator, addActivityController);
    app.patch('/acitivity/:id', updateActivityValidator, updateActivityController);
    app.delete('/acitivity/:id', removeActivityController);
    //definire app.use dopo la route app.post, app.patch
    app.post('/user',createUserValidator, createUserController);
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