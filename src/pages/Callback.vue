<template>
  <div>
    <h1>Loading...</h1>
  </div>
</template>

<script>
import axios from 'axios'
import { Buffer } from 'buffer';


export default {
  name: 'Callback',
  created() {
    if (this.$route.query.code) {
      const spotifyCode = this.$route.query.code
      const codeVerifier = localStorage.getItem('code_verifier')
      const body = new URLSearchParams({
        grant_type: 'authorization_code',
        code: spotifyCode,
        redirect_uri: process.env.VUE_APP_REDIRECT_URI,
        client_id: process.env.VUE_APP_CLIENT_ID,
        code_verifier: codeVerifier
      })
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      }

      return axios.post('https://accounts.spotify.com/api/token', body, { headers })
        .then(response => {
          localStorage.setItem('SPOTIFY_ACCESS_TOKEN', response.data.access_token);
          return this.$router.push('Playlists')
        })

    }
  }
}
</script>

<style scoped>
div {
  display: flex;
  text-align: center;
  justify-content: center;
  height: 100vh;
  background-color: rgb(33, 33, 33);
}

h1 {
  color: #1db954;
  font-size: 50px;
  font-family: "Poppins", sans-serif;
}
</style>