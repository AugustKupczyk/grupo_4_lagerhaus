import React from 'react';
import LastMovieInDb from './LastMovieInDb';
import GenresInDb from './GenresInDb';
import DetalleUltimoUsuario from './DetalleUltimoUsuario';
import DetalleUltimoProducto from './DetalleUltimoProducto';

function ContentRowCenter(){
    return (
        <div className="row">
            {/*<!-- End content row last movie in Data Base -->*/}
            <DetalleUltimoUsuario />
            <DetalleUltimoProducto />
            {/*<!-- Genres in DB -->*/}
            <GenresInDb />

        </div>
    )
}

export default ContentRowCenter;