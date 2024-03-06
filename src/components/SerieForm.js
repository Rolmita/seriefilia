import Button from "@/components/button-form"
import { newSerie } from "@/lib/actions"

async function SerieForm() {

    return (
        <form name='newSerieForm' action={newSerie} className="user-form">
            <div>
                <label htmlFor='nombreSerie' className="izq">Nombre: </label>
                <input type='text' name='nombreSerie' className="drch" />
            </div>
            <div>
                <label htmlFor="temporadasSerie" className="izq">Temporadas: </label>
                <input type='number' name='temporadasSerie' className="drch" />
            </div>
            <div>
                <label htmlFor="estadoSerie" className="izq">Estado: </label>
                <div className="drch">
                    <input type='radio' name='estadoSerie' value='En emisión' defaultChecked />
                    <label htmlFor="estadoSerie">En emisión </label>
                    <input type='radio' name='estadoSerie' value='Finalizada' />
                    <label htmlFor="estadoSerie">Finalizada </label>
                </div>
            </div>
            <div>
                <label htmlFor="inicioSerie" className="izq">Año de inicio: </label>
                <input type='text' name='inicioSerie' className="drch"></input>
            </div>
            <div>
                <label htmlFor="finalSerie" className="izq">Año de finalización: </label>
                <input type='text' name='finalSerie' className="drch"></input>
            </div>
            <Button type='submit' title='Guardar serie'></Button>
        </form>
    )
}

export default SerieForm