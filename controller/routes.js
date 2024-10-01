const createValidator = require('../validator/createValidator');
const updateValidator = require('../validator/updateValidator');
const addController = require('./addController')
const retrieveController = require('./retrieveController')
const removeController = require('./removeController')
const updateController = require('./updateController')

const setup = (app) => {
    app.get('/:id', retrieveController);
    app.post('/', createValidator, addController);
    app.patch('/:id', updateValidator, updateController);
    app.delete('/:id', removeController);
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

module.exports = setup;