<template>
  <div class="layout">
    <section class="sidebar">
      <h1>Explore</h1>
      <ul>
        <li><a href="#">Songs</a></li>
        <li><a href="#">Artists</a></li>
      </ul>
    </section>
    <section class="main">
      <h1>hi</h1>
    </section>
    <section class="acc">
      <h1>Your Account</h1>
      <section class="info">
        <img v-if="profilePhoto" :src="profilePhoto" alt="Profile Photo" />
        <h2>{{ username }}</h2>
        <h2>Followers: {{ followersCount }}</h2>
        <button>Sign out</button>
      </section>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Data',
  data() {
    return {
      playlists: [],
      username: '',
      profilePhoto: '',
      followersCount: ''
    }
  },
    created() {
    const spotifyAccessToken = sessionStorage.getItem('SPOTIFY_ACCESS_TOKEN');
    if (spotifyAccessToken) {
      return axios.get('https://api.spotify.com/v1/me', {
        headers: { Authorization: `Bearer ${spotifyAccessToken}` },
      })
      .then(response => {
        this.username = response.data.display_name;
        this.profilePhoto = response.data.images[0]?.url || '';
        this.followersCount = response.data.followers.total || 0;

        
      })
      .catch(error => {
        console.error("Error fetching username:", error);
      });
    } else {
      return this.$router.push('/');
    }
  }
}
</script>

<style scoped>
  .layout {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100vh;
    background-color: rgb(18, 18, 18);
  }

  .sidebar {
    background-color: rgb(33, 33, 33);
    border-radius: 10px;
    height: 95vh;
    width: 13.5vw;
    margin-left: 1vw;
    display: flex;
    flex-direction: column;
  }

  .main {
    background-color: rgb(33, 33, 33);
    border-radius: 10px;
    height: 95vh;
    width: 66.5vw;
  }

  .acc {
    background-color: rgb(33, 33, 33);
    border-radius: 10px;
    height: 95vh;
    width: 16.5vw;
    margin-right: 1vw;
  }

  .acc > h1 {
    padding-left: 0;
    text-align: center;
  }

  .info {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  img {
    width: 13vw;
    height: 13vw;
    border-radius: 50%;
    margin-bottom: 10px;
    image-rendering: -webkit-optimize-contrast;
  }

 h1 {
    text-align: left;
    color: white;
    font-family: "Circular", sans-serif;
    font-size: 2vw;
    padding-left: 15px;
  }

  h2 {
    text-align: left;
    color: white;
    font-family: "Circular", sans-serif;
    font-size: 1.2vw;
    margin: 7px;
  }

  ul {
    padding: 5px;
  }

  ul li {
    list-style: none;
    padding: 10px;
    padding-left: 15px;
  }

  ul li:hover {
    background-color: #535353;
    border-radius: 10px;
  }

  ul li a {
    text-decoration: none;
    color: white;
    font-family: "Circular", sans-serif;
    font-size: 1.2vw;
    text-align: left;
  }

  button {
    border-radius: 10px;
    border: none;
    padding: 20px;
    text-decoration: none;
    background-color: rgb(255, 255, 255, 0.3);
    color: white;
    margin-top: 20vh;
  }

  button:hover {
    background-color: rgb(255, 255, 255, 0.7);
  }
</style>