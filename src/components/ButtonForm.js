'use client'

export default function ButtonForm(prop) {

    async function buttonClick(event) {
        let accion = event.target.name
        let idSerie = event.target.id
        let edicion = document.getElementsByName('editar')
        let valoracion = document.getElementsByName('valorar')
        let eliminacion = document.getElementsByName('eliminar')
        switch (accion) {
            case 'valorar-serie':
                valoracion.forEach(v => { 
                    console.log(v.id);
                    if (v.id == idSerie) v.style.display = 'flex' })
                break;
            case 'editar-serie':
                edicion.forEach(ed => { if (ed.id == idSerie) ed.style.display = 'flex' })
                break;
            case 'eliminar-serie':
                eliminacion.forEach(e => { if (e.id == idSerie) e.style.display = 'flex' })
                break;
            case 'cancelar':
                valoracion.forEach(v => v.style.display = 'none')
                edicion.forEach(ed => ed.style.display = 'none')
                eliminacion.forEach(e => e.style.display = 'none')
                break;
        }
    }

    return (
        <button type='reset' onClick={buttonClick} name={prop.name} id={prop.id}>
            {prop.name == 'valorar-serie'
                ? 'Valorar'
                : (prop.name == 'editar-serie'
                    ? 'Editar'
                    : (prop.name == 'eliminar-serie'
                        ? 'Eliminar'
                        : 'Cancelar')
                )}
        </button>
    )
}