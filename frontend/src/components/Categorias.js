import React, { useState, useEffect } from 'react';

function Categorias() {
    const [countByCategory, setCountByCategory] = useState([]);

    useEffect(() => {
        // Realiza una solicitud a la API para obtener el último usuario creado
        fetch('http://localhost:3030/api/products') // Reemplaza con la URL correcta
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((responseData) => {
                // Extrae el recuento de productos por categoría de la respuesta JSON
                const countByCategoryFromAPI = responseData.countByCategory;
                setCountByCategory(countByCategoryFromAPI);
            })
            .catch((error) => {
                console.error('Error fetching recuento de productos por categoría:', error);
            });
    }, []);

    return (
        <div>
            <h2>Recuento de Productos por Categoría</h2>
            <ul>
                {countByCategory.map((categoria) => (
                    <li key={categoria.nombre}>
                        {categoria.nombre}: {categoria.count} productos
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Categorias;