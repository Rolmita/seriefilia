import Image from "next/image";

export default function Home() {
  return (
    <main className="principal">
      <img className="panel" src="imginicio.png" />
      <div className="contenido">
        <div className="frase">
          <p>Si lo tuyo es sentarte delante de la pantalla y ver uno tras otro los capítulos de tus series favoritas, si te sabes de memoria los diálogos de tu personaje preferido y necesitas saber más sobre la serie o comentarla:</p>
          <p>¡Esta es tu página!</p>
        </div>
      </div>
    </main>
  );
}
