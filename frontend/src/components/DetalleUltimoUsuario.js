import React, { useState, useEffect } from 'react';

function DetalleUltimoUsuario() {
  const [ultimoUsuario, setUltimoUsuario] = useState(null);

  useEffect(() => {
    // Realiza una solicitud a la API para obtener el último usuario creado
    fetch('http://localhost:3030/api/users') // Reemplaza con la URL correcta
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Actualiza el estado con los detalles del último usuario
        setUltimoUsuario(data.ultimoUsuario);
      })
      .catch((error) => {
        console.error('Error fetching último usuario:', error);
      });
  }, []);

  return (
    <div>
      <h2>Último Usuario Creado</h2>
      {ultimoUsuario ? (
        <div>
          <p>ID: {ultimoUsuario.id}</p>
          <p>Nombre: {ultimoUsuario.nombre}</p>
          {/* Agrega más campos según sea necesario */}
        </div>
      ) : (
        <p>No hay detalles disponibles.</p>
      )}
    </div>
  );
}

export default DetalleUltimoUsuario;