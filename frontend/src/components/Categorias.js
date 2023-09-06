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
            <ul>
                {countByCategory.map((categoria) => (
                    <div key={categoria.nombre}>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-6 mb-4">
                                    <div className="card bg-dark text-white shadow">
                                        <div className="card-body">
                                            {categoria.nombre}: {categoria.count} productos
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default Categorias;