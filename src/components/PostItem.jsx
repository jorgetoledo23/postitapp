import React from 'react'

export function PostItem({post, eliminarPost}){

    const {id, titulo, descripcion, importante} = post;

    const fnEliminarPost = () => {
        eliminarPost(id);
    }


    if(importante === false){
    return <li>
                
                <a href="#">
                <button onClick={fnEliminarPost} type="button" className="btn-close" aria-label="Close"></button>
                <h2>{titulo}</h2>
                <p>{descripcion}</p>
                </a>
            </li>
    }else{
        return <li className='bgred'>
                    
                    <a href="#">
                    <button onClick={fnEliminarPost} type="button" className="btn-close" aria-label="Close"></button>
                    <h2>{titulo}</h2>
                    <p>{descripcion}</p>
                    </a>
                </li>
    }

    
}
