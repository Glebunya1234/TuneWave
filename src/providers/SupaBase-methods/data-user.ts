"use server"
import querystring from 'querystring';
// import { getUserData } from './ss';
const client_id = "e835a9315aa44f89b301a14fa24984cd"
const client_secret = "e5880724c1de4d9192d9289454bf9ecd";
export const _getToken = async () => {

    const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
    const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

    const result = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials&client_id=' + client_id + '&client_secret=' + client_secret
    })
    const data = await result.json()
    console.log(data)
    return data.access_token
}

// export const getUsers = async () => {
//     const accessToken = await _getToken(); // Get the access token from your _getToken function


//     const USER_ENDPOINT = 'https://api.spotify.com/v1/me'; // Replace with the specific endpoint if needed

//     const response = await fetch(USER_ENDPOINT, {
//         method: 'GET',
//         headers: {
//             Authorization: 'Bearer' + accessToken
//         },
//     });



//     const userData = await response.json();
//     return userData;
// }

// export const getUserSavedAudiobooks = async () => {
//     const token = await getUserData()
//     try {
//         // console.log("userdata", getUsers())
//         // const token = await _getToken();
//         console.log(token)
//         const limit = 10;
//         const result = await fetch(`https://api.spotify.com/v1/me/albums`, {
//             method: 'GET',
//             headers: {
//                 'Authorization': 'Bearer ' + token
//             }
//         });
//         const data = await result.json()
//         console.log("DATAA", data)
//         return data
//     }
//     catch (error) {
//         console.log("error", error)
//     }
// }