import React from 'react';
import SmallCard from './SmallCard';
import SmallCardTotalUsuarios from './SmallCardTotalUsuarios';
import SmallCardTotalCategorias from './SmallCardTotalCategorias';


/*  Cada set de datos es un objeto literal */

/* <!-- Movies in DB --> */

let moviesInDB = {
    title: 'Movies in Data Base',
    color: 'primary', 
    cuantity: 21,
    icon: 'fa-clipboard-list'
}

/* <!-- Total awards --> */

let totalAwards = {
    title:' Total awards', 
    color:'success', 
    cuantity: '79',
    icon:'fa-award'
}

/* <!-- Actors quantity --> */

let actorsQuantity = {
    title:'Actors quantity' ,
    color:'warning',
    cuantity:'49',
    icon:'fa-user-check'
}

let cartProps = [moviesInDB, totalAwards, actorsQuantity];

function ContentRowMovies(){
    return (
    
        <div className="row">
            
            <SmallCard />
            <SmallCardTotalUsuarios />
            <SmallCardTotalCategorias />

        </div>
    )
}

export default ContentRowMovies;