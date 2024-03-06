import { getSeries, getPostId } from "@/lib/actions"
import { auth } from "@/auth"
import Button from "./button-form"

async function PostForm({ action, title, post, disabled, children }) {

    const series = await getSeries()

    return (
        <form action={action} className="user-form user-form-blog">
            <input type='hidden' name='id' value={post?.id} />
            <div>
                <label htmlFor='nombre' className="izq">Título de la entrada:</label>
                <input type='text' id='nombre' name='nombre'
                    placeholder='Escribe un título'
                    defaultValue={post?.nombre} autoFocus className="drch" />
            </div>
            <div>
                <label htmlFor='descripcion' className="all">Contenido del post:</label></div>
                <div>
                    <textarea type='text' id='descripcion' name='descripcion'
                        placeholder='Escribe cuanto desees contar...'
                        defaultValue={post?.descripcion} autoFocus className="all" />
                </div>
            
            <div>
                <label htmlFor="serie" className="izq">¿A qué serie pertenece?:</label>
                <select id='serie' name='serie' className="drch">
                    {post?.serie
                        ? <option key={post.serie.id} value={post.serie.id}>{post.serie.nombre}</option>
                        : <option value='null'>--Selecciona una serie--</option>
                    }
                    {series?.map((s) => (

                        <option key={s.id} value={s.id}>{s.nombre}</option>
                    ))
                    }
                    <option value='null'>No asociado a ninguna serie</option>
                </select>
            </div>
            {/* <Button title={title}></Button> */}
            <button type='submit'>Enviar</button>
        </form>
    )
}

export default PostForm