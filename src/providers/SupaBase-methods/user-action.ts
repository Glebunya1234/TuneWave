"use server"
import { createClient } from "@/utils/supabase/server";
import { Provider } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { getURL } from "@/utils/helpers";

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
        redirect(data.url)

    }
}

export const SignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut().then(() => {
        return redirect(`/`)
    });
    // console.log((await GetDataProfileUser()).user)
};

export const IsAuthorized = async () => {
    const data = await GetDataProfileUser()
    console.log(data)
    if (data === null) {
        return redirect("/?messange=You must log in")
    }
}

export const GetDataProfileUser = async () => {
    const supabase = createClient()

    const { data, error } = await supabase.auth.getUser()
    return data
}