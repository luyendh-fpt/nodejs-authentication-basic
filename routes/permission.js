module.exports = function (...allowed) {

    function isAllowed(role) {
        return allowed.indexOf(role) > -1;
    }

    return function (request, response, next) {
        if (1 == 2)
            next();
        else {
            var err = new Error('Forbidden');
            err.status = 403;
            next(err);
        }
    }
}