const ApiError = require('../exceptions/api-error');

module.exports = function (err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.status).send({message: err.message, errors: err.errors}).json({message: err.message, errors: err.errors})
    }
};