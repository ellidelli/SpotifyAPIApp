<template class = "web">
  <div class="bg">
    <section class="case">
      <h3>Statify</h3>
      <h1> login for your Spotify stats</h1>
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
    border-radius: 10px;
    text-align: center;
  }

  h1 {
    font-size:calc(12px + 2vw);
    font-family: "Circular", sans-serif;
    color: white;
    padding: 10px;
    padding-bottom: 30px;
  }

  h3 {
    font-size:calc(12px + 10vw);
    font-family: "Circular", sans-serif;
    color: white;
    padding: 10px;
    /* padding: 20px; */
    /* padding-bottom: 15vh; */
    /* padding-top: 15vh; */
    /* text-shadow: 0px 0px 10px #191414; */
  }

  div > section > button {
    margin: 30px;
    margin-left: 30px;
    font-size: 1vw;
    padding: 1vh 2vw;
    background-color: #1db954;
    border-radius: 5px;
    border: none;
    font-family: "Circular" serif;
    color: white;
  }

  button:hover {
    margin: 0;
    margin-left: 30px;
    font-size: 1vw;
    padding: 1vh 2vw;
    background-color: rgb(29,185,84, 0.5);
    border-radius: 5px;
  }

  .bg {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: 300% 300%;
    background-image: linear-gradient(-45deg, #1DB954 0%, #1DB954 25%, #191414 51%, #191414 100%);
    -webkit-animation: AnimateBG 20s ease infinite;
            animation: AnimateBG 20s ease infinite;
  }

  @-webkit-keyframes AnimateBG {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  @keyframes AnimateBG {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
      /* From https://css.glass */
  .case {
    background: rgba(255, 255, 255, 0.30);
    border-radius: 16px;      
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(12.1px);
    -webkit-backdrop-filter: blur(12.1px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

  }
</style>