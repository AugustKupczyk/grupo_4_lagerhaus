import React, { useState, useEffect } from 'react';

function TotalProductos() {
  const [count, setcount] = useState(0);

  useEffect(() => {
    // Realiza la solicitud a la API para obtener el count de productos
    fetch('http://localhost:3030/api/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Supongamos que el servidor devuelve un objeto con un campo 'count'
        setcount(data.count);
      })
      .catch((error) => {
        console.error('Error fetching count de productos:', error);
      });
  }, []);

  return (
    <div>
      <h4>Total de Productos</h4>
      <p>Total: {count}</p>
    </div>
  );
}

export default TotalProductos;
