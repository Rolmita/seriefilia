import { deleteSerie, editSerie, getSeries, valorarSerie } from "@/lib/actions";
import Link from "next/link";
import Button from "@/components/button-form"
import ButtonForm from "@/components/ButtonForm";
import { auth } from "@/auth"

export default async function Series() {
    const seriesO = await getSeries();

    const abcd = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

    let session = await auth()

    // console.log(seriesO);

    return (
        <main className="contenido">
            <div className="listado-series">
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1>GLOSARIO DE SERIES</h1>
                    {session && session.user.role == 'ADMIN'
                        ? <button ><Link href='/series/new'>Nueva serie</Link></button>
                        : ''}
                </div>

                {abcd.map(element => (
                    <div key={element}>
                        <h2 key={element} className="glosario">{element}</h2>
                        {seriesO.map(s => (
                            s.nombre.substring(0, 1) === element
                                ? <div key={s.id} className="card">
                                    <Link href={`/blog/entradas?id=${s.id}`} key={s.id}><h3>{s.nombre.toUpperCase()}</h3></Link>
                                    <div className="card-serie">
                                        <div className="infor left">
                                            <p><strong>Temporadas: </strong>{s.temporadas}</p>
                                            <p><strong>Estado: </strong>{s.estado}</p>
                                            <p><strong>Emisión: </strong>{s.inicio} - {s.final != null ? s.final : 'Actualidad'}</p>
                                            <p><strong>Valoración de la comunidad: </strong>{Number(parseFloat(Math.round(s.valoracion * 100) / 100).toFixed(2))}</p>
                                        </div>
                                        {session?.user.role == 'USER'
                                            ? < div className="botones right">
                                                <ButtonForm name="valorar-serie" id={s.id} />
                                            </div>
                                            : ''
                                        }
                                        {session?.user.role == 'ADMIN'
                                            ? <div className="botones right" >
                                                <ButtonForm name="valorar-serie" id={s.id} />
                                                <ButtonForm name="editar-serie" id={s.id} />
                                                <ButtonForm name="eliminar-serie" id={s.id} />
                                            </div>
                                            : ''
                                        }
                                    </div>
                                    <form id={s.id} name='valorar' className='valorarForm user-form' action={valorarSerie} style={{ display: 'none' }} >
                                        <div>
                                            <input type='hidden' name='idSerie' value={s.id} />
                                            <input type='hidden' name='nombreUser' value={session?.user.name} />
                                            <label htmlFor="valoracionUser" className="izq">Valora esta serie del 1 al 10: </label>
                                            <input type='number' step='0.5' min='1' max='10' id='valoracionUser' name='valoracionUser' className="drch" />
                                        </div>
                                        <div>
                                            <Button type='submit' id={s.id} title='Valorar'></Button>
                                            <ButtonForm name='cancelar' id={s.id} />
                                        </div>
                                    </form>
                                    <div className="formAdmin " >
                                        <form name='editar' style={{ display: 'none' }} id={s.id} action={editSerie} className="user-form">
                                            <input type='hidden' name='idSerieEdit' value={s.id} />
                                            <div>
                                                <label htmlFor='nombreSerie' className="izq">Nombre: </label>
                                                <input type='text' name='nombreSerie' defaultValue={s.nombre} className="drch" />
                                            </div>
                                            <div>
                                                <label htmlFor="temporadasSerie" className="izq">Temporadas: </label>
                                                <input type='number' name='temporadasSerie' defaultValue={s.temporadas} className="drch" />
                                            </div>
                                            <div>
                                                <label htmlFor="estadoSerie" className="izq">Estado: </label>
                                                {s.estado == 'En emisión'
                                                    ? <div className="drch"><input type='radio' name='estadoSerie' value={s.estado} defaultChecked />
                                                        <label htmlFor="estadoSerie">En emisión </label>
                                                        <input type='radio' name='estadoSerie' value='Finalizada' />
                                                        <label htmlFor="estadoSerie">Finalizada </label></div>
                                                    : <div className="drch"><input type='radio' name='estadoSerie' value='En emisión' />
                                                        <label htmlFor="estadoSerie">En emisión </label>
                                                        <input type='radio' name='estadoSerie' value={s.estado} defaultChecked />
                                                        <label htmlFor="estadoSerie">Finalizada </label></div>}
                                            </div>
                                            <div>
                                                <label htmlFor="inicioSerie" className="izq">Año de inicio: </label>
                                                <input type='text' name='inicioSerie' defaultValue={s.inicio} className="drch"></input>
                                            </div>
                                            <div>
                                                <label htmlFor="finalSerie" className="izq">Año de finalización: </label>
                                                <input type='text' name='finalSerie' defaultValue={s.final} className="drch"></input>
                                            </div>
                                            <Button title='Guardar cambios' id={s.id} />
                                            <ButtonForm name='cancelar' id={s.id} />
                                        </form>
                                        <form name='eliminar' style={{ display: 'none' }} action={deleteSerie} id={s.id} className="user-form">
                                            <input type='hidden' name='eliminarIdSerie' value={s.id} />
                                            <p>¿Estás seguro de que deseas eliminar todos los datos referentes a esta serie?</p>
                                            <Button title='Borrar serie' id={s.id} />
                                            <ButtonForm name='cancelar' id={s.id} />
                                        </form>
                                    </div>
                                </div>
                                : ''
                        ))}
                    </div>
                ))}
            </div>
        </main>
    )
}