import { auth } from "@/auth"
import { redirect } from "next/navigation"

async function page() {
  const sesion = await auth()

  if (sesion?.user.role !== 'ADMIN')
    redirect('/dashboard')

  return (
    <main className="contenido">
      <div className="listado-series">
        <div>
          <h2 style={{ marginTop: '5%' }}>🔐  Admin panel</h2 >
        </div>
        <div>
          <div className="user-form panel">
            <div className="izq">
              <div><p> {sesion?.user.name}</p></div>
              <div><p> {sesion?.user.email} </p></div>
              <div><p> {sesion?.user.role} </p></div>
            </div>
            <div className="drch">
              {sesion != null
                ? <img src={sesion?.user.image} style={{ width: '50%' }}></img>
                : <img src='/user.png' style={{ width: '50%', backgroundColor: 'gray' }}></img>
              }
            </div>
          </div>
        </div>
      </div>
    </main >
  )
}

export default page