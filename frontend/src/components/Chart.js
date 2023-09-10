import React, { useState, useEffect } from 'react';

function Chart() {
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
    <div className="card shadow mb-4">
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
              </tr>
            </tfoot>
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
          </table>
        </div>
      </div>
    </div>
  );
}

export default Chart;
