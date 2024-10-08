import createActivityValidator from '../validator/activity/createValidator.js'
import updateActivityValidator from '../validator/activity/updateValidator.js'
import createUserValidator from '../validator/user/createValidator.js'
import addController from './addController.js'
import retrieveController from './retrieveController.js'
import removeController from './removeController.js'
import updateController from './updateController.js'
import createUserController from './createUserController.js'
                                                                     
const setup = (app) => {
    app.get('/acitivity/:id', retrieveController);
    app.post('/acitivity', createActivityValidator, addController);
    app.patch('/acitivity/:id', updateActivityValidator, updateController);
    app.delete('/acitivity/:id', removeController);
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