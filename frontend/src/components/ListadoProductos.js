import React, { useState, useEffect } from 'react';

function ListadoProductos() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Realiza una solicitud a la API para obtener la lista de productos
    fetch('http://localhost:3030/api/products') // Reemplaza con la URL correcta
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((responseData) => {
        // Extrae la lista de productos de la respuesta JSON
        const productsFromAPI = responseData.products;
        setProducts(productsFromAPI);
      })
      .catch((error) => {
        console.error('Error fetching lista de productos:', error);
      });
  }, []);

  return (
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.nombre}</td>
            <td>{product.descripcion}</td>
            <td>{product.precio}</td>
          </tr>
        ))}
      </tbody>
  );
}

export default ListadoProductos;