export function no304(req, res, next) {
    res.setHeader('Last-Modified', (new Date()).toUTCString());
    next();
}

export function verifyAccount(req, res, next) {
    if (!req.user) {
        next({statusCode: 401, message: 'Unauthorized. Try logging in.'});
    } else {
        req.accountId = req.user;
        next();
    }
}

export function handleApiErrors(err, req, res, next) {
    if (err) {
        res.statusCode = (err.statusCode)? err.statusCode:500;
        let errorMessage = (err.message)? err.message:'There was a sever error, sorry.';
        res.send(JSON.stringify({error: errorMessage}));
    } else {
        next();
    }
}

export function verifyRequestBody(requiredProperties) {
    return (req, res, next) => {
        try {
            if (req.body === undefined) throw '';
            if (req.body.date === undefined) req.body.date = new Date();
            for (var i = 0; i < requiredProperties.length; i++) {
                if (req.body[requiredProperties[i]] === undefined) throw '';
            }
            next();
        } catch (exception) {
            next({statusCode: 400, message: 'Invalid request body.'});
        }
    };
}
