'use client'
import { getPosts } from "@/lib/actions";

async function ViewMoreButton() {
    let count = 3;

    async function sumarPosts(count){
        count++
        return count
    }

    return (
        <button onClick={sumarPosts(count)} >Ver más</button>
    )
}
export default ViewMoreButton