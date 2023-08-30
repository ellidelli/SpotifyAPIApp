<template>
  <div class="layout">
    <section class="sidebar">
      <h1>Explore</h1>
      <ul>
        <li><a href="#">Top songs</a></li>
        <li><a href="#">Top artists</a></li>
      </ul>
    </section>
    <section class="main">
      <h1>{{topMsg}}</h1>
      <h2>{{ shorterMsg }}</h2>
      <ul>
      <li v-for="track in topTracks" :key="track.id">
        <img :src="track.album.images[0].url" alt="Track Album" />
        <div>
          <h2>{{ track.name }}</h2>
          <p>{{ track.artists[0].name }}</p>
        </div>
      </li>
    </ul>
    </section>
    <section class="acc">
      <h1>Your Account</h1>
      <section class="info">
        <img v-if="profilePhoto" :src="profilePhoto" alt="Profile Photo" />
        <h2>{{ username }}</h2>
        <h3>Followers: {{ followersCount }}</h3>
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
      followersCount: '',
      topMsg: 'Lets get started',
      shorterMsg: 'Global Top Tracks',
      topTracks: []
    }
  },
    created() {
    const spotifyAccessToken = sessionStorage.getItem('SPOTIFY_ACCESS_TOKEN');
    if (spotifyAccessToken) {
      axios.get('https://api.spotify.com/v1/me', {
        headers: { Authorization: `Bearer ${spotifyAccessToken}` },
      })
      .then(response => {
        this.username = response.data.display_name;
        this.profilePhoto = response.data.images[0]?.url || '';
        this.followersCount = response.data.followers.total || 0;
        
        // Fetch top tracks
        axios.get('https://api.spotify.com/v1/me/top/tracks', {
            headers: { Authorization: `Bearer ${spotifyAccessToken}` },
            params: {
              time_range: 'short_term', // or 'medium_term' or 'long_term'
              limit: 10, // Number of tracks to fetch
            },
          })
          .then(topTracksResponse => {
            this.topTracks = topTracksResponse.data.items;
          })
          .catch(error => {
            console.error('Error fetching top tracks:', error);
          });
      })
      .catch(error => {
        console.error('Error fetching username:', error);
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

  .main h2 {
    padding-left: 30px;
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
    font-size: 1.5vw;
    margin: 7px;
    font-weight: 700;
  }

  h3 {
    text-align: left;
    color: #b3b3b3;
    font-family: "Circular", sans-serif;
    font-size: 1vw;
    margin: 7px;
    font-weight: 400;
  }

  ul {
    padding: 5px;
    margin: 0;
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
    color: #b3b3b3;
    font-family: "Circular", sans-serif;
    font-size: 1.2vw;
    text-align: left;
  }

  button {
    border-radius: 10px;
    border: none;
    padding: 20px;
    text-decoration: none;
    background-color: rgb(255, 255, 255, 0);
    color: white;
    margin-top: 20vh;
  }

  button:hover {
    background-color: rgb(255, 255, 255, 0.7);
  }
</style>