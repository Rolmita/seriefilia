import { getPostId, deletePost, comentar, deleteComentario } from "@/lib/actions";
import { auth } from "@/auth"
import Link from "next/link";
import Button from "./button-form";

async function Post({ post }) {

    let session = await auth()
    let usuario

    if (session) usuario = session.user.name

    if (post) {
        post = await getPostId(post.id)
    }

    console.log(post);

    return (
        <div className="entrada" id={post?.id}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between" }}>
                <h1 className="titulo">{post?.nombre.toUpperCase()}</h1>
                {session && session.user.role == 'ADMIN' && post != null
                    ? <div className="botones-entrada"><button>
                        <Link href={`/blog/entrada/editar?id=${post.id}`}><img className="img-button" src="/editar-texto.png"></img></Link>
                    </button>
                        <form name='eliminarPost'>
                            <input type="hidden" name="eliminarIdPost" value={post.id} />
                            <button formAction={deletePost}>
                                <img className="img-button" src="/eliminar.png"></img>
                            </button></form>
                    </div>
                    : ''}
            </div>
            {post?.serie
                ? <Link href={`/blog/entradas?id=${post?.serie.id}`}><strong>{post?.serie.nombre}</strong></Link>
                : ''}

            <p>{post?.descripcion}</p>
            <p style={{ fontSize: '0.75em' }}><strong>Última actualización: </strong>{String(post?.actualizado)}</p>
            <br />
            <div>
                <h2>Comentarios</h2>
                {session
                    ? <form action={comentar} className="user-form">
                        <input type='hidden' name='idPost' value={post.id}></input>
                        <input type='hidden' name='nombreUsuario' value={usuario}></input>
                        <textarea name='txtComentario' style={{ width: '100%', height: '100px' }} placeholder="Añade un comentario"></textarea>
                        <button type='submit'>Enviar comentario</button>
                    </form>
                    : ''}
                {post?.comentarios.map(c => (
                    <div className="comentario" key={c.id}>
                        <div className="cabecera-comentario">
                            <h4>{c.autor}</h4>
                            <form name='eliminarComentario'>
                                <input type="hidden" name="eliminarIdComentario" value={c.id} />
                                {c.autor == usuario || (session && session.user.role == 'ADMIN')
                                    ? <button formAction={deleteComentario}>
                                        <img className="img-button" src="/eliminar.png"></img>
                                    </button>
                                    : ''
                                }
                            </form>
                        </div>
                        <p>{c.descripcion}</p>
                        <p style={{ fontSize: '0.75em' }}><strong>Publicado: </strong>{String(c.creado)}</p>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default Post