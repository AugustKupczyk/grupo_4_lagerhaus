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
        console.log(data.ultimoUsuario);
        setUltimoUsuario(data.ultimoUsuario);
      })
      .catch((error) => {
        console.error('Error fetching último usuario:', error);
      });
  }, []);

  return ultimoUsuario && (
    <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3 d-flex justify-content-between">
          <h5 className="m-0 font-weight-bold text-gray-800">Ultimo usuario creado</h5>
          <p>ID: {ultimoUsuario.id}</p>
        </div>
        <div className="card-body">
          <div className="text-center">
            <p>Nombre: {ultimoUsuario.nombre}</p>
            <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: 40 + 'rem' }} src={`http://localhost:3030${ultimoUsuario.img}`} alt={ultimoUsuario.nombre} />
          </div>
          <div className='flex'>
          </div>
          <a className="btn btn-danger" target="_blank" rel="nofollow" href="/">Ver detalle del ultimo usuario creado</a>
        </div>
      </div>
    </div>

  );
}

export default DetalleUltimoUsuario;