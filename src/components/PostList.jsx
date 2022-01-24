import React, { Fragment, useState, useRef, useEffect } from 'react'
import { v4 as uuid } from 'uuid';
import { PostItem } from './PostItem';

const KEY = "postlist-posts"


export function PostList(){

    const [posts, setPosts] = useState([]);

    const descripcionPost = useRef();
    const tituloPost = useRef();
    
    useEffect(() => {
        const storedPosts = JSON.parse(localStorage.getItem(KEY));
        if (storedPosts){
            setPosts(storedPosts);
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(posts));
    }, [posts])

    const agregarPost = () => {
        console.log("AGREGANDO TAREA");
        const descripcion = document.getElementById('descripcion').value
        const titulo = document.getElementById('titulo').value
        const importante = document.getElementById('importante').checked

        if ((descripcion === '') && (titulo === '')) return;

        setPosts((prevPosts) => {
            const newPost = {
                id: uuid(),
                titulo: titulo,
                descripcion: descripcion,
                importante: importante
            }

            return [...prevPosts, newPost]
        })

        descripcionPost.current.value = null
        tituloPost.current.value = null
    }

    const limpiarPost = () => {
        localStorage.clear()
    }

    const eliminarPost = (id) => {
        const newPosts = [...posts];
        const post = newPosts.find((post) => post.id === id)
        var index = newPosts.indexOf(post)
        if(index > -1){
            newPosts.splice(index, 1)
        }
        setPosts(newPosts);
    }


    const [isChecked, setIsChecked] = useState(true);

    return (

        <Fragment>
            <div className='row mt-5'>
                <div className='col-md-4'>
                    <div className="mb-3">
                        <label htmlFor="titulo" className="form-label">Titulo</label>
                        <input ref={tituloPost} type="text" className="form-control" id="titulo"></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="descripcion" className="form-label">Descripcion</label>
                        <input ref={descripcionPost} type="text" className="form-control" id="descripcion"></input>
                    </div>
                    <div className="form-check mb-3">
                        <input className="form-check-input" type="checkbox" value="" id="importante"
                            onChange={(event) => setIsChecked(event.currentTarget.checked)}
                            onClick={() => setIsChecked(!isChecked)}
                            checked={isChecked}
                        ></input>
                        <label className="form-check-label" htmlFor="importante">
                            Importante ?
                        </label>
                    </div>

                    <div className="mb-3 d-grid gap-2">
                        <button onClick={agregarPost} className="btn btn-block btn-outline-success ms-2">Add Post It</button>

                        <button onClick={limpiarPost} className="btn btn-outline-success ms-2">Borrar Post Its</button>
                    </div>
                </div>
            </div>

            
            <div className='row mt-5'>
                
                <ul className='justify-content-center'>
                    {posts.map((post) => (
                        <PostItem post={post} key={post.id} eliminarPost={eliminarPost}></PostItem>
                    ))}
                </ul>
                
            </div>

        </Fragment>

    );
}
