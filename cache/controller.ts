
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);


export const readAccessToken = async (userIdSupabase: string): Promise<string | null> => {
    try {
        const data = await getUserToken(userIdSupabase);


        if (!data || !data.accessToken) {
            console.warn(`Токен доступа не найден для userId: ${userIdSupabase}`);
            return null
        };


        return data.accessToken;
    } catch (error) {
        console.error('Ошибка при чтении токена доступа из кэша:', error);
        return null
    }
};

export const readRefreshToken = async (userIdSupabase: string): Promise<string | null> => {
    try {
        const data = await getUserToken(userIdSupabase);


        if (!data || !data.refreshToken) {
            console.warn(`Рефреш-токен не найден для userId: ${userIdSupabase}`);
            return null
        }

        return data.refreshToken;
    } catch (error) {
        console.error('Ошибка при чтении рефреш-токена из кэша:', error);
        return null
    };
}

export function writeToken(userIdSupabase: string, token: string): Promise<any>; // Для обычного токена
export function writeToken(userIdSupabase: string, token: string, refreshToken: string): Promise<any>; // Для токена и refresh токена



export async function writeToken(userIdSupabase: string, token: string, refreshToken?: string): Promise<any> {
    if (refreshToken) {
        return await upsertUserTokenAndRefresh(userIdSupabase, token, refreshToken);
    } else {
        return await upsertUserToken(userIdSupabase, token);
    }
}

async function upsertUserToken(userIdSupabase: string, token: string) {
    const { data, error } = await supabase
        .from('user_tokens')
        .upsert([{ user_id: userIdSupabase, token: token }], { onConflict: 'user_id' });

    if (error) {
        console.error('Ошибка при обновлении или вставке токена:', error);
        return null;
    }

    return data;
}


async function upsertUserTokenAndRefresh(userIdSupabase: string, token: string, refreshToken: string) {
    const { data, error } = await supabase
        .from('user_tokens')
        .upsert([{ user_id: userIdSupabase, token: token, refresh_token: refreshToken }], { onConflict: 'user_id' });

    if (error) {
        console.error('Ошибка при обновлении или вставке токена:', error);
        return null;
    }

    return data;
}


async function getUserToken(userIdSupabase: string): Promise<{ accessToken: string | null; refreshToken: string | null } | null> {
    const { data, error } = await supabase
        .from('user_tokens')
        .select('token, refresh_token')
        .eq('user_id', userIdSupabase)
        .single();

    if (error) {
        console.error('Ошибка при получении токена:', error);
        return null;
    }


    if (!data) {
        console.warn(`Токены не найдены для userId: ${userIdSupabase}`);
        return { accessToken: null, refreshToken: null };
    }


    return {
        accessToken: data.token,
        refreshToken: data.refresh_token
    };
}