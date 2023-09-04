const middlewares = {
    allowUnsignedIn: (req, res, next) => {
        if (!req.session.user) {
            next()
        } else {
            res.redirect("/");
        }
    },

    allowSignedIn: (req, res, next) => {
        if (req.session.user) {
            next()
        } else {
            res.redirect("/users/login");
        }
    },

    allowAdmin: (req, res, next) => {
        // Verificar si el usuario tiene el rol de administrador (por ejemplo, rol_id = 1 para administrador)
        if (req.session.user && req.session.user.rol_id === 1) {
            next();
        } else {
            res.redirect("/");
        }
    },
}

module.exports = middlewares;