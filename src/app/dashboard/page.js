import { auth } from "@/auth"

async function page() {
    const sesion = await auth()

    return (
        <main className="contenido">
            <div className="listado-series">
                <div>
                    <h2 style={{ marginTop: '5%' }}> 🔑  Dashboard</h2 >
                </div>
                <div>
                    <div className="user-form panel">
                        <div className="izq">
                            <div><p> {sesion?.user.name}</p></div>
                            <div><p> {sesion?.user.email} </p></div>
                            <div><p> {sesion?.user.role} </p></div>
                        </div>
                        <div className="drch">
                            <img src={sesion?.user.image} style={{ width: '50%' }}></img>
                        </div>
                    </div>
                </div>
            </div>
        </main >
    )
}

export default page