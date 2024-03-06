import Form from "@/components/PostForm"
import { newPost } from "@/lib/actions"

function page({ }) {

  return (
    <div className="contenido-blog">
      <h2>Nuevo post</h2>
      <div className="user-form-blog">
        <Form action={newPost} title='Crear post' post={null} disabled={false} />
      </div>
    </div>
  )
}

export default page