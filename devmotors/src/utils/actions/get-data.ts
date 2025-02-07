
import { redirect } from "next/navigation";

function delay(ms: number){
    return new Promise(resolve => setTimeout(resolve, ms))
}

export async function getDataHome(){
    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/objects/67993a9503a8330f06b9e0b2?pretty=true&read_key=${process.env.READ_KEY}&props=slug,title,metadata,type`, { next: { revalidate: 120 } })

        if(!res.ok){
            throw new Error("Failed to fetch data")
        }

        return res.json();

    }catch(err){
        throw new Error("Failed to fetch data")
    }
}

export async function getSubMenu(){
    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/objects?pretty=true&query=%7B%22type%22:%22pages%22%7D&limit=10&skip=0&read_key=${process.env.READ_KEY}&props=slug,title`, { next: { revalidate: 120 } })

        if(!res.ok){
            throw new Error("Failed to fetch menu data")
        }

        return res.json()

    }catch(err){
        throw new Error("Failed to fetch menu data")
    }
}

export async function getItemBySlug(itemSlug: string){
    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/objects`

    // Definindo o objeto de consulta pelo slug
    const queryParams = new URLSearchParams({
        query: JSON.stringify({
            slug: itemSlug
        }),
        props: 'slug, title, content, metadata',
        read_key: process.env.READ_KEY as string
    })

    const url = `${baseUrl}?${queryParams.toString()}`;

    try{

        const res = await fetch(url, { next: { revalidate: 120 } })

        if(!res.ok){
            throw new Error("Failed get item by slug")
        }

        return res.json();

    }catch(err){
        console.log(err)
        redirect("/")
    }
}

// /objects?pretty=true&query=%7B%22type%22:%22pages%22%7D&limit=10&skip=0&read_key=Dsn2zpvJF0GUWi8NRqWotDk0aNscuWWEhhkQ6WoNq1Uwsfh9IT&depth=1&props=slug,title,