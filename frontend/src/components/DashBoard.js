import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import TotalProductos from './TotalProductos';
import TotalUsuarios from './TotalUsuarios';
import TotalCategorias from './TotalCategorias';
import DetalleUltimoUsuario from './DetalleUltimoUsuario';
import DetalleUltimoProducto from './DetalleUltimoProducto';
import Categorias from './Categorias';
import ListadoProductos from './ListadoProductos';

function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/total-productos">Total de Productos</Link>
                    </li>
                    <li>
                        <Link to="/total-usuarios">Total de Usuarios</Link>
                    </li>
                    <li>
                        <Link to="/total-categorias">Total de Categorías</Link>
                    </li>
                    <li>
                        <Link to="/detalle-ultimo-usuario">Detalle Último Usuario</Link>
                    </li>
                    <li>
                        <Link to="/detalle-ultimo-producto">Detalle Último Producto</Link>
                    </li>
                    <li>
                        <Link to="/categorias">Categorías</Link>
                    </li>
                    <li>
                        <Link to="/listado-productos">Listado de Productos</Link>
                    </li>
                </ul>
            </nav>

            <Switch>
                <Route path="/total-productos" component={TotalProductos} />
                <Route path="/total-usuarios" component={TotalUsuarios} />
                <Route path="/total-categorias" component={TotalCategorias} />
                <Route path="/detalle-ultimo-usuario" component={DetalleUltimoUsuario} />
                <Route path="/detalle-ultimo-producto" component={DetalleUltimoProducto} />
                <Route path="/categorias" component={Categorias} />
                <Route path="/listado-productos" component={ListadoProductos} /> 
                <Route path="/" exact>
                    <p>Selecciona una opción en el menú de arriba.</p>
                </Route>
            </Switch>
        </div>
    );
}

export default Dashboard;