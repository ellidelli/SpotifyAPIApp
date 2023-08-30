<template>
  <div>
    <h1>Loading...</h1>
  </div>
</template>

<script>
import axios from 'axios'
const qs = require('qs');
import { Buffer } from 'buffer';


export default {
  name: 'Callback',
  created() {
    if (this.$route.query.code) {
      const spotifyCode = this.$route.query.code
      const basicAuth = `Basic ${(Buffer.from(`${process.env.VUE_APP_CLIENT_ID}:${process.env.VUE_APP_CLIENT_SECRET}`).toString('base64'))}`
      return axios.post('https://accounts.spotify.com/api/token', 
        new URLSearchParams({ 
          code: spotifyCode, 
          grant_type: 'authorization_code', 
          redirect_uri: process.env.VUE_APP_REDIRECT_URI 
        }).toString(), 
        { 
          headers: { 
            Authorization: basicAuth, 
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(response => {
          sessionStorage.setItem('SPOTIFY_ACCESS_TOKEN', response.data.access_token);
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