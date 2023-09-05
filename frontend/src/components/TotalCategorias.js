import React, { useState, useEffect } from 'react';

function TotalCategorias() {
  const [totalCategories, setTotalCategories] = useState(0);

  useEffect(() => {
    // Realiza la solicitud a la API para obtener el total de categorías
    fetch('http://localhost:3030/api/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Extrae el total de categorías de la respuesta JSON
        const totalCategoriesFromAPI = data.totalCategories;
        setTotalCategories(totalCategoriesFromAPI);
      })
      .catch((error) => {
        console.error('Error fetching total de categorías:', error);
      });
  }, []);

  return (
    <div>
      <h4>Total de Categorías</h4>
      <p>Total: {totalCategories}</p>
    </div>
  );
}

export default TotalCategorias;
