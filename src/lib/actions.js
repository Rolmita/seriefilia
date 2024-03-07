'use server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { signIn, signOut } from '@/auth';
import { getUserByEmail } from '@/lib/data';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';


// REGISTER
export async function register(formData) {
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')

    // Comprobamos si el usuario ya está registrado
    const user = await getUserByEmail(email);

    if (user) {
        return { error: 'El email ya está registrado' }
    }

    // Encriptamos password 
    const hashedPassword = await bcrypt.hash(password, 10)

    // Guardamos credenciales en base datos
    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    return { success: "Registro correcto" }
}



// LOGIN credentials
export async function login(formData) {
    const email = formData.get('email')
    const password = formData.get('password')

    // Comprobamos si el usuario está registrado
    const user = await getUserByEmail(email);

    if (!user) {
        return { error: 'Usuario no registrado.' }
    }

    // Comparamos password 
    const matchPassword = await bcrypt.compare(password, user.password)

    if (user && matchPassword) {  // && user.emailVerified
        await signIn('credentials',
            {
                email, password,
                redirectTo: globalThis.callbackUrl
                // redirectTo: user.role == 'ADMIN' ? '/admin' : '/dashboard'
            })
        return { success: "Inicio de sesión correcto" }
    } else {
        return { error: 'Credenciales incorrectas.' }
    }

}

// LOGIN google
export async function loginGoogle() {
    try {
        await signIn('google', { redirectTo: globalThis.callbackUrl })
    } catch (error) {
        console.log(error);
        throw error
    }
}

// LOGIN github
export async function loginGithub() {
    try {
        await signIn('github', { redirectTo: globalThis.callbackUrl })
    } catch (error) {
        console.log(error);
        throw error
    }
}

// LOGIN twitch
export async function loginTwitch() {
    try {
        await signIn('twitch', { redirectTo: globalThis.callbackUrl })
    } catch (error) {
        console.log(error);
        throw error
    }
}

//LOGIN discord
export async function loginDiscord() {
    try {
        await signIn('discord', { redirectTo: globalThis.callbackUrl })
    } catch (error) {
        console.log(error);
        throw error
    }
}

// LOGOUT
export async function logout() {
    try {
        await signOut({ redirectTo: '/' })
    } catch (error) {
        throw error
    }
}


export async function getPosts(count) {
    try {
        const posts = await prisma.post.findMany({
            orderBy: { creado: 'desc' },
            take: count,
            include: { serie: true }
        })
        return posts;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getPostId(id) {
    try {
        const post = await prisma.post.findUnique({
            where: { id },
            include: { serie: true, comentarios: true }
        })
        return post;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function newPost(formData) {
    const nombre = formData.get('nombre')
    const descripcion = formData.get('descripcion')
    const serieId = Number(formData.get('serie'))
    try {
        const resultado = await prisma.post.create({
            data: {
                nombre: nombre,
                serieId: serieId,
                descripcion: descripcion,
            }
        })
        console.log(resultado);
        revalidatePath('/blog')
        redirect(`/blog/entrada?id=${resultado.id}`)
    } catch (error) {
        console.log(error);
        throw error
    }
}

export async function editPost(formData) {
    const idPost = Number(formData.get('id'))
    const titulo = formData.get('nombre')
    const texto = formData.get('descripcion')
    const idSerie = Number(formData.get('serie'))
    try {
        const resultado = await prisma.post.update({
            where: { id: idPost },
            data: {
                nombre: titulo,
                descripcion: texto,
                serieId: idSerie
            }
        })
        console.log(resultado)
        revalidatePath(`/blog/entrada?id=${resultado.id}`)
        redirect(`/blog/entrada?id=${resultado.id}`)
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function deletePost(formData) {
    const eliminarIdPost = Number(formData.get('eliminarIdPost'))
    try {
        const resultado = await prisma.post.delete({
            where: { id: eliminarIdPost }
        })
        console.log(resultado)
        revalidatePath(`/blog`)
        redirect('/blog')
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function comentar(formData) {
    const idPost = Number(formData.get('idPost'))
    const nombre = formData.get('nombreUsuario')
    const txtComentario = formData.get('txtComentario')

    try {
        const resultado = await prisma.comentario.create({
            data: {
                autor: nombre,
                postId: idPost,
                descripcion: txtComentario
            }
        })
        console.log(resultado);
        revalidatePath(`/blog/entrada?id=${idPost}`)
    } catch (error) {
        console.log(error);
    }
}

export async function deleteComentario(formData) {
    const idComentario = Number(formData.get('eliminarIdComentario'))
    try {
        const resultado = await prisma.comentario.delete({
            where: {
                id: idComentario
            }
        })
        console.log(resultado);
        revalidatePath(`/blog/entrada?id=${idPost}`)
    } catch (error) {
        console.log(error);
    }
}

export async function getPostsSerie(id) {
    try {
        console.log(id);
        const idSerie = Number(id)
        console.log(idSerie);
        const resultado = await prisma.serie.findUnique({
            where: {
                id: idSerie
            },
            include: { posts: true }
        })
        return resultado.posts
    } catch (error) {
        console.log(error);
        return null
    }
}

export async function getSeries(count) {
    try {
        const series = await prisma.serie.findMany({
            orderBy: { nombre: 'asc' },
        })
        return series;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getSerieId(id) {
    try {
        const serie = await prisma.serie.findUnique({
            where: { id }
        })
        return serie;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function bestSeries(count, estado) {
    try {
        const series = await prisma.serie.findMany({
            where: { estado: estado },
            orderBy: { valoracion: 'desc' },
            take: count
        })
        return series;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function newSerie(formData) {
    const nombreSerie = formData.get('nombreSerie')
    const temporadasSerie = Number(formData.get('temporadasSerie'))
    const estadoSerie = formData.get('estadoSerie')
    const inicioSerie = formData.get('inicioSerie')
    const finalSerie = formData.get('finalSerie')
    try {
        const resultado = await prisma.serie.create({
            data: {
                nombre: nombreSerie,
                temporadas: temporadasSerie,
                estado: estadoSerie,
                inicio: inicioSerie,
                final: finalSerie
            }
        })
        console.log(resultado);
        revalidatePath('/series')
        redirect('/series')
    } catch (error) {
        console.log(error);
        throw error
    }
}

export async function valorarSerie(formData) {
    try {
        const idSerie = Number(formData.get('idSerie'))
        const nombreUser = formData.get('nombreUser')
        const valoracionUser = Number(formData.get('valoracionUser'))
        let valores = []
        let valorada = []
        let numeroValoraciones = 0
        let totalValoracion = 0

        const serieV = await prisma.serie.findUnique({
            where: {
                id: idSerie
            }
        })

        if (serieV.valoraciones == null) {
            valorada = [{ nombre: nombreUser, valoracion: valoracionUser }]
        } else {
            valores = serieV.valoraciones
            valorada = valores.concat({ nombre: nombreUser, valoracion: valoracionUser })
        }

        for (let i = 0; i < valorada.length; i++) {
            numeroValoraciones++
            totalValoracion += valorada[i].valoracion
        }

        const valoracionSerie = totalValoracion / numeroValoraciones

        const resultado = await prisma.serie.update({
            where: {
                id: idSerie
            },
            data: {
                valoraciones: valorada,
                valoracion: valoracionSerie
            }
        })
        console.log(resultado);
        revalidatePath(`/series`)

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function editSerie(formData) {
    const nombreSerie = formData.get('nombreSerie')
    const temporadasSerie = Number(formData.get('temporadasSerie'))
    const estadoSerie = formData.get('estadoSerie')
    const inicioSerie = formData.get('inicioSerie')
    const finalSerie = formData.get('finalSerie')
    const idSerieEdit = Number(formData.get('idSerieEdit'))
    try {
        const resultado = await prisma.serie.update({
            where: { id: idSerieEdit },
            data: {
                nombre: nombreSerie,
                temporadas: temporadasSerie,
                estado: estadoSerie,
                inicio: inicioSerie,
                final: finalSerie
            }
        })
        console.log(resultado)
        revalidatePath(`/series`)
        redirect('/series')
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function deleteSerie(formData) {
    const eliminarIdSerie = Number(formData.get('eliminarIdSerie'))
    try {
        const resultado = await prisma.serie.delete({
            where: { id: eliminarIdSerie }
        })
        console.log(resultado)
        revalidatePath(`/series`)
        redirect('/series')
    } catch (error) {
        console.log(error)
        throw error
    }
}