import Form from "@/components/SerieForm"
import { newSerie } from "@/lib/actions"

function page({ }) {

  return (
    <main className="contenido">
      <div className="listado-serie">
        <h2 style = {{marginTop:'5%'}}>Nueva serie</h2>
          <Form title='Crear serie' serie={null} disabled={false} />
        </div>
    </main>
  )
}

export default page