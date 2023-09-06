import React from 'react';
import ListadoProductos from './ListadoProductos';


function ChartRow(props){
    return (
                <tr>
                    <td>{props.Title}</td>
                    <td>{props.Length}</td>

                    <td>{props.Awards}</td>
                </tr>
            )
    }
    
        

export default ChartRow;