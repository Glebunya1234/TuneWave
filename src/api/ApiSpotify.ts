"use server"

import { GetDataProfileUser } from '@/providers/SupaBase-methods/user-action';
import { readAccessToken } from '../../cache/controller';
import { test } from './SP-Tokens/API-SP-Tokens';



export const fetchWithRetry = async (url: string): Promise<Response> => {

    const userData = await GetDataProfileUser();
    let userId = userData.user?.id ?? "";
    let accessTokenData = await readAccessToken(userId);


    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessTokenData}`,
        },
    });

    if (response.status >= 400 && response.status < 500) {
        accessTokenData = await test();

        response = await fetch(url, {
            method: 'GET',
            headers: {

                'Authorization': `Bearer ${accessTokenData}`,
            },
        });
    }

    return response;
};

export const fetchWithRetryForWriteMethods = async (url: string, options: RequestInit = {}): Promise<Response> => {




    const userData = await GetDataProfileUser();
    let userId = userData.user?.id ?? "";
    let accessTokenData = await readAccessToken(userId);

    let response = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            'Authorization': `Bearer ${accessTokenData}`,
        },
    });

    if (response.status >= 400 && response.status < 500) {
        console.warn(`Ошибка клиента (статус ${response.status}), обновляем токен...`);


        accessTokenData = await test();


        response = await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                'Authorization': `Bearer ${accessTokenData}`,
            },
        });
    }

    if (!response.ok) {
        const errorText = await response.text();
        console.error(`Ошибка при выполнении запроса: ${errorText}`);
    }

    return response;
};