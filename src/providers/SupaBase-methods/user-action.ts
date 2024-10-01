"use server"
import { createClient } from "@/utils/supabase/server";
import { Provider } from "@supabase/supabase-js";
import { redirect, RedirectType } from "next/navigation";
import { getURL } from "@/utils/helper/helpers";
import { cookies } from "next/headers";

export const oAuthSignIn = async (provider: Provider) => {

    if (!provider) {
        console.log("Не авторизован");
        return redirect(`/?message=NoProvidersSelected`, RedirectType.push)
    }

    const supabase = createClient();

    const redirectUrl = getURL("/auth/callback");
    console.log('redirectUrl :>> ', redirectUrl);
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo: redirectUrl,
            scopes: 'user-library-read user-read-private user-library-modify user-read-recently-played user-top-read user-read-playback-position user-follow-read user-follow-modify playlist-modify-public playlist-modify-private playlist-read-private user-read-currently-playing user-modify-playback-state streaming user-read-playback-state ugc-image-upload',
            queryParams: {
                show_dialog: 'true'
            }
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
    await supabase.auth.signOut({ scope: 'local' }).then(() => {
        const cookieStore = cookies();


        const supabaseCookies = cookieStore.getAll();
        supabaseCookies.forEach(({ name }) => cookieStore.delete(name));

        return redirect(`/`)
    });

};

export const IsAuthorized = async () => {
    const data = await GetDataProfileUser()

    if (data === null) {
        return redirect("/?messange=You must log in")
    }
}

export const GetDataProfileUser = async () => {
    const supabase = createClient()

    const { data, error } = await supabase.auth.getUser()
    return data
}
