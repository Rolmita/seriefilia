import Link from "next/link";
import { getPosts, bestSeries } from "@/lib/actions";
import { auth } from "@/auth"


export default async function layoutBlog({ children }) {
    const session = await auth();
    const recentPost = await getPosts(5)
    // console.log('POST RECIENTES', recentPost);

    const bestSeriesF = await bestSeries(5, 'Finalizada')
    // console.log(bestSeriesF);

    const bestSeriesE = await bestSeries(5, 'En emisión')
    // console.log(bestSeriesE);

    return (
        <div className="contenido-total">
            {children}
            <aside>
                <div className="contenido-aside">
                    <div className="boton-new" >
                        {session?.user?.role === 'ADMIN'
                            ? <button><Link href="/blog/new">Nueva entrada</Link></button> : ''}
                    </div>
                    <section className="aside-section">
                        <h2>Lo más reciente</h2>
                        <div className="enlace">
                            {recentPost.map(r => (
                                <Link href={`/blog/entradas?id=${r.id}`} key={r.id}>
                                    {r.nombre}
                                </Link>
                            ))}
                        </div>
                    </section>
                    <section className="aside-section">
                        <h2>Las mejores series en emisión</h2>
                        <div className="enlace">
                            <ol>
                                {/* Por cada serie más votada, una lista de 5 series */}
                                {bestSeriesE.map((s) => (
                                    <li key={s.id}><Link href="/blog/serie/">{s.nombre}</Link></li>
                                ))}
                            </ol>
                        </div>
                    </section>
                    <section className="aside-section">
                        <h2>Las mejores series ya finalizadas</h2>
                        <div className="enlace">
                            <ol>
                                {/* Por cada serie más votada, una lista de 5 series */}
                                {bestSeriesF.map((s) => (
                                    <li key={s.id}><Link href="/blog/serie/">{s.nombre}</Link></li>
                                ))}
                            </ol>
                        </div>
                    </section>
                </div>
            </aside>
        </div>
    );
}