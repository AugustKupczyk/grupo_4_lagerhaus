import React, { useState, useEffect } from 'react';

function DetalleUltimoProducto() {
    const [ultimoProducto, setUltimoProducto] = useState(null);

    useEffect(() => {
        // Realiza una solicitud a la API para obtener el último usuario creado
        fetch('http://localhost:3030/api/products') // Reemplaza con la URL correcta
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                // Actualiza el estado con los detalles del último usuario
                setUltimoProducto(data.ultimoProducto);
            })
            .catch((error) => {
                console.error('Error fetching último usuario:', error);
            });
    }, []);

    return ultimoProducto && (
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4 h-100">
                <div className="card-header py-3 d-flex justify-content-between">
                    <h5 className="m-0 font-weight-bold text-gray-800">Último Producto Creado</h5>
                    <p>ID: {ultimoProducto.id}</p>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <p>Nombre: {ultimoProducto.nombre}</p>
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: 40 + 'rem' }} src={`http://localhost:3030${ultimoProducto.img}`} alt={ultimoProducto.nombre} />
                    </div>
                    <p>Descripción: {ultimoProducto.descripcion}</p>
                    <a className="btn btn-danger" target="_blank" rel="nofollow" href="/">Ver detalle del ultimo producto creado</a>
                </div>
            </div>
        </div>
    );
}

export default DetalleUltimoProducto;