import { getPostsSerie } from "@/lib/actions";
import Link from "next/link";

export default async function page(searchParams) {
    
    const idSerie = Number(searchParams.searchParams.id)
    const entradas = await getPostsSerie(idSerie)
    // console.log(entradas);

    return (
        <main className="contenido-blog">
            <div className="entradas">
                {entradas.length > 0
                    ? <>{
                        entradas.map((p) => (
                            <div className="entrada" key={p.id}>
                                <Link href={{ pathname: '/blog/entrada', query: { id: p.id } }}><h1 className="titulo">{p.nombre}</h1></Link>
                                <p>{p.descripcion}</p>
                            </div>
                        ))
                    }</>
                    : <p>Actualmente no hay ningún post para esta serie</p>
                }
            </div>
        </main>
    )
}