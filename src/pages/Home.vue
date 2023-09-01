<template class = "web">
  <div>
    <section>
      <h3>check out your <span style="color: #1db954;">Spotify</span> stats</h3>
      <button @click="loginToSpotify"> Login to Spotify</button>
    </section>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'Home',
  methods: {
    loginToSpotify() {
      const params = {
        response_type: 'code',
        client_id: process.env.VUE_APP_CLIENT_ID,
        scope: 'playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-top-read',
        redirect_uri: process.env.VUE_APP_REDIRECT_URI,
        state: uuidv4()
      }
      return window.location.href = `https://accounts.spotify.com/authorize?${new URLSearchParams(params)}`
    }
  }
}
</script>

<style scoped>
  * { margin: 0 !important;
    padding: 0; 
    box-sizing: border-box;
  }

  div {    
    background-color: rgb(18,18,18);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    min-height: fit-content;
  }

  section {
    background-color: rgb(33,33,33);
    height: 95vh;
    width: 95vw;
    border-radius: 20px;
    text-align: center;
  }

  h3 {
    font-size:calc(12px + 10vw);
    font-family: "Circular", sans-serif;
    color: white;
    padding: 20px;
    padding-bottom: 15vh;
    padding-top: 15vh;
  }

  button {
    border-radius: 10px;
    border: none;
    padding: 20px;
    text-decoration: none;
    background-color: rgb(255, 255, 255, 0.3);
    color: white;
    font-family: "Circular" serif;
  }

  button:hover {
    background-color: rgb(255, 255, 255, 0.7);
  }
</style>