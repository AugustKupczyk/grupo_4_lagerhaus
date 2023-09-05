
const { Usuario } = require('../../database/models');

const userControllers = {
  // Obtener la lista completa de usuarios
  getAllUsers: async (req, res) => {
    try {
      const users = await Usuario.findAll({ attributes: ['id', 'nombre', 'email'] });
      const userCount = users.length;

      // Obtener el último usuario creado
      const { id, nombre, img } = await Usuario.findOne({
        attributes: ['id', 'nombre', 'img'], // Ajusta las columnas que deseas mostrar
        order: [['id', 'DESC']], // Ordena por ID en orden descendente para obtener el último usuario
      });

      // Construye la respuesta
      const response = {
        count: userCount,
        users: users.map(user => ({
          id: user.id,
          nombre: user.nombre,
          email: user.email,
          detail: `/api/users/${user.id}` // URL para obtener el detalle del usuario
        })),
        ultimoUsuario: {
          id, nombre, img
          // Agrega otras propiedades del usuario aquí
        },
      };

      res.json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener la lista de usuarios' });
    }
  },

  // Obtener los detalles de un usuario por su ID
  getUserById: async (req, res) => {
    const userId = req.params.id;

    try {
      const user = await Usuario.findByPk(userId, {
        attributes: { exclude: ['contraseña', 'categoria'] } // Excluye información sensible
      });

      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      // Construye la respuesta
      const response = {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        // Agrega otras propiedades del usuario aquí
        image: `http://localhost:3030${user.img}`,
      };

      res.json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los detalles del usuario' });
    }
  },

  // Obtener la imagen de perfil de un usuario por su ID
  getUserProfileImage: async (req, res) => {
    const userId = req.params.id;

    try {
      const user = await Usuario.findByPk(userId);

      if (!user || !user.img) {
        return res.status(404).json({ error: 'Usuario no encontrado o sin imagen de perfil' });
      }

      // Construir la ruta completa a la imagen en base a la columna "img" de la base de datos
      const imagePath = path.join('public', user.img);

      // Enviar la imagen como respuesta
      res.sendFile(imagePath);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener la imagen de perfil del usuario' });
    }
  }
};


module.exports = userControllers;