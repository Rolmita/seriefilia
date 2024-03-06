import Form from "@/components/PostForm"
import { editPost, getPostId } from "@/lib/actions"

async function page({ searchParams}) {
  const post = await getPostId(Number(searchParams.id))  

  return (
    <div className="contenido-blog">
      <h2>Editar post</h2>
      <Form action={editPost} title='Editar post' post={post} disabled={false} />
    </div>
  )
}

export default page