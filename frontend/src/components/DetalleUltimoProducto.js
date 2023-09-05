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

    return (
        <div>
            <h2>Último Producto Creado</h2>
            {ultimoProducto ? (
                <div>
                    <p>ID: {ultimoProducto.id}</p>
                    <p>Nombre: {ultimoProducto.nombre}</p>
                    <p>Descripción: {ultimoProducto.descripcion}</p>
                    {/* Agrega más campos según sea necesario */}
                </div>
            ) : (
                <p>No hay detalles disponibles.</p>
            )}
        </div>
    );
}

export default DetalleUltimoProducto;