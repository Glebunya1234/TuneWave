"use client"
import { useRouter } from "next/navigation"


export const RouterFunc = (path:string):void => {
    const router = useRouter()
    router.push(`${path}`)
}



