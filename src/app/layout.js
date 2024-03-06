import "./globals.css";
import Link from "next/link"
import { auth } from "@/auth"
import { logout } from '@/lib/actions'

export const metadata = {
  title: "Seriefilia",
  description: "Una página para seriéfilos",
};

export default async function RootLayout({ children }) {
  const session = await auth();
  return (
    <html lang="es">
      <body >
        <header>
          <div>
            <h1 className="protest-strike-regular">SERIEFILIA</h1>
          </div>
          <div>
            <div className="dropdown" style={{width:'120px'}}>
              <button className="session">
                <img src="/user.png" className="user-img" />
              </button>
              <div className="dropdown-content" style={{ backgroundColor: 'gray' }}>
              {session
                    ? <form><button className='session-close'formAction={logout}>Cerrar sesión</button></form>
                    :
                    (<>
                        <Link href="/auth/register">Registrarse</Link>
                        <Link href="/auth/login">Iniciar sesión</Link>
                    </>)
                }
              </div>
            </div>
          </div>
        </header>
        <nav>
          <div>
            <Link href="/">Inicio</Link>
            <Link href="/series">Series</Link>
            <Link href="/blog">Blog</Link>
            {session?.user?.role === 'ADMIN'
              ? <Link href="/admin">Panel de administrador</Link>
              : <Link href="/dashboard">Panel de usuario</Link>
            }
            <Link href="/contacto">Contacto</Link>
          </div>
        </nav>
        {children}
        <footer>
          <p>¿Tienes alguna sugerencia? ¿Echas en falta algún título? <a href="/contacto">Contacta con nosotros</a></p>
        </footer>
      </body>
    </html>
  );
}
