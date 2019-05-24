module.exports = function (req, res, next) {
    var err = new Error('Hello middleware.');
    err.status = 401;
    if (1 == 2) {
        next(err);
    } else {
        // always continue to next middleware
        next();
    }
}