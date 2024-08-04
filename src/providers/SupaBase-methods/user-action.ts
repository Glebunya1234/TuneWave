"use server"
import { createClient } from "@/utils/supabase/server";
import { Provider } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { getURL } from "@/utils/helpers";
import { cookies } from "next/headers";

// export const oAuthSignIn = async (provider: Provider) => {
//     if (!provider) {
//         console.log("Не авторизован");
//         return redirect(`/?message=NoProvidersSelected`)
//     }

//     const supabase = createClient();

//     const redirectUrl = getURL("/auth/callback");
//     const { data, error } = await supabase.auth.signInWithOAuth({
//         provider,
//         options: {
//             redirectTo: redirectUrl,
//         }
//     })

//     if (error) {
//         return redirect(`/?message=notAuth`)
//     }
//     if (data.url) {
//         redirect(data.url)

//     }
// }
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
            scopes: 'user-library-read user-library-modify user-read-recently-played user-top-read user-read-playback-position user-follow-read user-follow-modify playlist-modify-public playlist-modify-private playlist-read-private user-read-currently-playing user-modify-playback-state user-read-playback-state ugc-image-upload'
        }
    })

    if (error) {
        return redirect(`/?message=notAuth`)
    }
    if (data.url) {
        return redirect(data.url);

    }
}

export const SignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut().then(() => {
        const cookieStore = cookies();


        const supabaseCookies = cookieStore.getAll();
        supabaseCookies.forEach(({ name }) => cookieStore.delete(name));

        return redirect(`/`)
    });
    // console.log((await GetDataProfileUser()).user)
};

export const IsAuthorized = async () => {
    const data = await GetDataProfileUser()
    // console.log(data)
    if (data === null) {
        return redirect("/?messange=You must log in")
    }
}

export const GetDataProfileUser = async () => {
    const supabase = createClient()

    const { data, error } = await supabase.auth.getUser()
    return data
}