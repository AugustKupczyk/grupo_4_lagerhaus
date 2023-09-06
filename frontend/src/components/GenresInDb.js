import React from "react";
import Categorias from './Categorias'

function GenresInDb() {
  return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">
            Recuento de Productos por Categoría
          </h5>
        </div>
            <Categorias/>        
      </div>
    </div>
  );
}

export default GenresInDb;
