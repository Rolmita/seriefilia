
import {prisma} from '@/lib/prisma'
import Post from '@/components/Post'

export const dynamic = 'force-dynamic'

async function page({ searchParams }) {

    const post = await prisma.post.findUnique({
        where: {
            id: Number(searchParams.id),
        },
    })

    return (
        <div className="contenido-blog">
            <Post key={post?.id} post={post} ></Post>
        </div>
    )
}

export default page
