'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import { getPosts } from "@/lib/actions";


export default function Blog({ children }) {

  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState(3);

  useEffect(() => {
    async function fetchData() {
      const data = await getPosts(count);
      setPosts(data);
    }

    fetchData();
  }, [count]);

  async function sumarPosts() {
    setCount(count + 3);
  }

  return (

    <main className="contenido-blog">
      <div className="entradas">
        {/* 5 entradas recientes */}
        {posts.map(p => (
          <div className="entrada" key={p.id}>
            <Link href={{ pathname: '/blog/entrada', query: { id: p.id } }}><h1 className="titulo">{p.nombre}</h1></Link>
            <Link href={`/blog/entradas?id=${p.serie?.id}`}><h3><strong>{p.serie?.nombre}</strong></h3></Link>
            <p style={{ textAlign: 'left', whiteSpace: 'pre-wrap', width: '100%' }}>{p.descripcion}</p>
          </div>
        ))}
      </div>
      <button onClick={sumarPosts}>Ver más</button>

    </main>
  );
}