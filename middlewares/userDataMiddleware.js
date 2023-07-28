const userDataMiddleware = (req, res, next) => {
    // Obtener el usuario de la sesión si está autenticado
    const userData = req.session.user || {};

    // Agregar el objeto userData a la respuesta para que esté disponible en todas las vistas
    res.locals.userData = userData;
    next();
   
};

module.exports = userDataMiddleware;