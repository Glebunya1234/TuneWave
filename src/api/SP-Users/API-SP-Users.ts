import { CurrentlyUserType } from "@/types/SpotifyTypes/CurrentlyUser/type";
import { test } from "../SP-Tokens/API-SP-Tokens";

export const GetUserById = async (userId: string): Promise<CurrentlyUserType> => {
    const { access_token } = await test()
    const url = `https://api.spotify.com/v1/users/${userId}`
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${access_token}`,
        },


    });
    const Data: CurrentlyUserType = await response.json();
    return Data;
}