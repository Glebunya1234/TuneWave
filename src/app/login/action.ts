"use server"
import { createClient } from "@/utils/supabase/server";
import { Provider } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

import { revalidatePath } from 'next/cache'
import { getURL } from "@/utils/helpers";


export async function login(formData: FormData) {
    const supabase = createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signup(formData: FormData) {
    const supabase = createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signUp(data)

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export const oAuthSignIn = async (provider: Provider) => {
    if (!provider) {
        console.log("Не авторизован");
        return redirect(`/?message=NoProvidersSelected`)
    }
    
    const supabase = createClient();
    const redirectUrl = getURL("/auth/callback");
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo: redirectUrl,
        }
    })
    if (error) {
        return redirect(`/?message=notAuth`)
    }
    if (data.url) {
        redirect(data.url) // use the redirect API for your server framework
    }
}