<table>
 
  <tr >
   <td width='1200px' height='150px'>
    <p align="center" >
     <img src="public/Tunewave.png" width='750px' alt="LogoBot">
    </p>
   </td>
  </tr>

 
<tr>
 <td>
  <p align='center'>
  <img alt="NextJS" src="https://img.shields.io/badge/-Next js-090909?style=for-the-badge&logo=nextdotjs&logoColor=white">
  <img alt="Supabase" src="https://img.shields.io/badge/-Supabase-090909?style=for-the-badge&logo=supabase&logoColor=white">
  <img alt="SpotifyApi" src="https://img.shields.io/badge/-Spotify Api-090909?style=for-the-badge&logo=spotify&logoColor=white">
  <img alt="WebPlaybackSDK" src="https://img.shields.io/badge/-Web Playback SDK-090909?style=for-the-badge&logo=spotify&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/-TypeScript-090909?style=for-the-badge&logo=typescript&logoColor=white">
  <img alt="SWR" src="https://img.shields.io/badge/-SWR-090909?style=for-the-badge&logo=swr&logoColor=white">
  <img alt="SCSS" src="https://img.shields.io/badge/-scss-090909?style=for-the-badge&logo=sass&logoColor=white">
  <img alt="TailwindCSS" src="https://img.shields.io/badge/-TailwindCSS-090909?style=for-the-badge&logo=tailwindcss&logoColor=white">
  </p>
 </td>
</tr>

</table>

<table>
  <tr>
    <td colspan="2">
      <h3 align='center'>TuneWave is an innovative web app that gives users the ability to explore and enjoy music using Spotify API data and features (Premium required to listen to tracks).</h3>
    </td>
  </tr>
  
  <tr>
    <td>
       
 > - _**View saved tracks in your collection**_
    </td>
    <td>
    
  > - _**Save or delete tracks you don't like**_
    </td>

  
  </tr>
  
   <tr>
    <td>
       
  > - _**View found user playlists**_
    </td>
    <td>
    
  > - _**Subscribe to authors, playlists, albums**_
    </td>

 
  </tr>
  <tr>

  <td>
    
  > - _**Listen to any tracks**_
    </td>
      <td>
    
  > - _**And more...**_
    </td>
  </tr>
</table>

<table style="width: 100%; max-width: 100%;">
  <tr>
    <td style="width: 100%; max-width: 100%;">

   ## 🔧Installationㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
<tr>
  <td>
 	       1. Cloning the repository
  </td>
</tr>

<tr>
  <td>
<br>
			
```bash
https://github.com/Glebunya1234/TuneWave.git
```

  </td>
</tr>

<tr>
  <td>
 	 2. Install dependencies

  </td>
</tr>

<tr>
  <td>
<br>

```bash
yarn install
```
  </td>
</tr>

<tr>
  <td>
 	 3. Environment setup
  </td>
</tr>

<tr>
  <td>
<h6>You need to create an application in Supabase and add the Spotify provider to Authentication/Providers, also in the Authentication/URL Configuration tab specify the Site URL (https://localhost:3000)

You also need to create an application in the <a href="https://developer.spotify.com/dashboard">Spotify dashboard</a>, enter your Spotify account and get a Client ID,
Client secret 
Next, you need to create a `.env` file in the root directory and enter the following variables:</h6>

	
```bash
NEXT_PUBLIC_SUPABASE_URL=******
NEXT_PUBLIC_SUPABASE_ANON_KEY=******
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=******
NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET=******
NEXT_PUBLIC_SITE_URL=https://localhost:3000
```
  </td>
</tr>



<tr>
  <td>
 	 4. Create table
  </td>
</tr>

<tr>
  <td>
<br>

You need to create one collections in your Supabase:

```bash
CREATE TABLE user_tokens (
  user_id TEXT PRIMARY KEY, 
  token TEXT NOT NULL,
  refresh_token TEXT
);
```

  </td>
</tr>

<tr>
  <td>
 	5. Project launch
  </td>
</tr>


<tr>
  <td>
<br>

```bash
yarn dev
```

  </td>
</tr>

<tr>
  <td>
 	  	 

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&weight=900&size=16&duration=2000&pause=5500&color=858C9C&center=true&vCenter=true&random=false&width=1200&separator=%3C&lines=Please+note%2C+since+the+program+is+in+development+mode%2C+you+need+to+add+a+user+to+the+Spotify+dashboard+each+time+(maximum+20))](https://git.io/typing-svg)

  </td>
</tr>

</table>

