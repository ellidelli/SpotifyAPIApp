<template>
  <div class="layout">
    <Sidebar></Sidebar>
    <section class="main">
      <div v-if="$route.path === '/global'">
        <h1>Lets Get Started</h1>
        <h2>Global Top Tracks</h2>
        <ul>
          <li v-for="(track, index) in globalTopTracks" :key="track.id">
            <h3>{{ index + 1 }}</h3>
            <img :src="track.album.images[0].url" alt="Track Album" class="globalCardImg" />
            <div>
              <h3>{{ track.name }}</h3>
              <h3>{{ track.artists[0].name }}</h3>
            </div>
          </li>
        </ul>
      </div>
      <div v-else-if="$route.path === '/toptracks'">
        <h1>Your Top Tracks</h1>
        <button @click="getTopTracks('short_term')">Last 4 Weeks</button>
        <button @click="getTopTracks('medium_term')">Last 6 Months</button>
        <button @click="getTopTracks('long_term')">All Time</button>
        <h2 style="margin-top: 20px;">{{ trackTimeTitle }}</h2>
        <ul>
          <li v-for="(track, index) in topTracks" :key="track.id">
            <h3>{{ trackCount[index] }}</h3>
            <img :src="track.album.images[0].url" alt="Track Album" />
            <div>
              <h3>{{ track.name }}</h3>
              <h3>{{ track.artists[0].name }}</h3>
            </div>
          </li>
        </ul>
      </div>
      <div v-else-if="$route.path === '/topartists'">
        <h1>Your Top Artists</h1>
        <button @click="getTopArtists('short_term')">Last 4 Weeks</button>
        <button @click="getTopArtists('medium_term')">Last 6 Months</button>
        <button @click="getTopArtists('long_term')">All Time</button>

        <h2 style="margin-top: 20px;">{{ artistTimeTitle }}</h2>
        <ul>
          <li v-for="(artist, index) in topArtists" :key="artist.id">
            <h3>{{ index + 1 }}</h3>
            <img :src="artist.images[0].url" alt="Artist Image" />
            <div>
              <h3>{{ artist.name }}</h3>
            </div>
          </li>
        </ul>

      </div>
    </section>
    <section class="acc">
      <h1>Account</h1>
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
import Sidebar from '../components/sidebar.vue';
export default {
  name: 'Data',
  mounted() {
    console.log("route:", this.$route)
  },
  data() {
    return {
      playlists: [],
      username: '',
      profilePhoto: '',
      followersCount: '',
      topTracks: [],
      rank: '',
      stat: null,
      timeRange: 'null',
      trackTimeTitle: 'Past 4 Weeks',
      artistTimeTitle: 'Past 4 Weeks',
      globalTopTracks: [],
      accBgColor: ''
    };
  },
  created() {
    const spotifyAccessToken = localStorage.getItem('SPOTIFY_ACCESS_TOKEN');
    if (spotifyAccessToken) {
      axios.get('https://api.spotify.com/v1/me', {
        headers: { Authorization: `Bearer ${spotifyAccessToken}` },
      })
        .then(response => {
          this.username = response.data.display_name;
          console.log(response.data.images);
          this.profilePhoto = response.data.images[1]?.url || '';
          this.followersCount = response.data.followers.total || 0;
          //fetch global 50
          const playlistId = '37i9dQZEVXbMDoHDwVN2tF';
          axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            headers: {
              Authorization: `Bearer ${spotifyAccessToken}`,
            },
          })
            .then(response => {
              this.globalTopTracks = response.data.items.map(item => item.track);
              console.log(this.globalTopTracks);
            })
            .catch(error => {
              console.error('Error fetching playlist tracks:', error);
            });
          // Fetch top tracks
          axios.get('https://api.spotify.com/v1/me/top/tracks', {
            headers: { Authorization: `Bearer ${spotifyAccessToken}` },
            params: {
              time_range: 'short_term',
              limit: 50,
            },
          })
            .then(topTracksResponse => {
              this.topTracks = topTracksResponse.data.items;
              this.rank += 1;
            })
            .catch(error => {
              console.error('Error fetching top tracks:', error);
            });
          //fetch top artists
          axios.get('https://api.spotify.com/v1/me/top/artists', {
            headers: { Authorization: `Bearer ${spotifyAccessToken}` },
            params: {
              time_range: 'short_term',
              limit: 50,
            },
          })
            .then(topArtistsResponse => {
              this.topArtists = topArtistsResponse.data.items;
              this.rank += 1;
            });
        })
        .catch(error => {
          console.error('Error fetching username:', error);
        });
    }
    else {
      return this.$router.push('/');
    }
  },
  methods: {
    // showSection(section) {
    //   this.activeSection = section;
    // },
    getTopTracks(timeRange) {
      const spotifyAccessToken = localStorage.getItem('SPOTIFY_ACCESS_TOKEN');
      axios.get('https://api.spotify.com/v1/me/top/tracks', {
        headers: { Authorization: `Bearer ${spotifyAccessToken}` },
        params: {
          time_range: timeRange,
          limit: 50,
        },
      })
        .then(topTracksResponse => {
          this.topTracks = topTracksResponse.data.items;
          this.rank += 1;
          if (timeRange == 'short_term') {
            this.trackTimeTitle = "Past 4 Weeks";
          }
          else if (timeRange == 'medium_term') {
            this.trackTimeTitle = "Past 6 Months";
          }
          else if (timeRange == "long_term") {
            this.trackTimeTitle = "All Time";
          }
        })
        .catch(error => {
          console.error('Error fetching top tracks:', error);
        });
    },
    getTopArtists(timeRange) {
      const spotifyAccessToken = localStorage.getItem('SPOTIFY_ACCESS_TOKEN');
      axios.get('https://api.spotify.com/v1/me/top/artists', {
        headers: { Authorization: `Bearer ${spotifyAccessToken}` },
        params: {
          time_range: timeRange,
          limit: 50,
        },
      })
        .then(topArtistsResponse => {
          this.topArtists = topArtistsResponse.data.items;
          this.rank += 1;
          if (timeRange == 'short_term') {
            this.artistTimeTitle = "Past 4 Weeks";
          }
          else if (timeRange == 'medium_term') {
            this.artistTimeTitle = "Past 6 Months";
          }
          else if (timeRange == "long_term") {
            this.artistTimeTitle = "All Time";
          }
        })
        .catch(error => {
          console.error('Error fetching top artists:', error);
        });
    }
  },
  computed: {
    trackCount() {
      return this.topTracks.map((track, index) => index + 1);
    },
  },
  components: { Sidebar }
};

</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  background-color: rgb(0 0 0);
  position: absolute;
}

.main {
  background: linear-gradient(to bottom, rgb(35 35 35) 10%, rgb(18 18 18) 90%);
  border-radius: 10px;
  margin-top: 20px;
  height: 95vh;
  width: 66.5vw;
  overflow: scroll;
}

.main h2 {
  padding-left: 30px;
}

.acc {
  background-color: rgb(18 18 18);
  border-radius: 10px;
  margin-top: 20px;
  min-height: 95vh;
  height: fit-content;
  width: 16.5vw;
  margin-right: 1vw;
}

.acc>h1 {
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
}

h1 {
  text-align: left;
  color: rgb(255 255 255);
  font-family: "Circular", sans-serif;
  font-size: 1.5vw;
  padding-left: 15px;
}

h2 {
  text-align: left;
  color: rgb(255 255 255);
  font-family: "Circular", sans-serif;
  font-size: 1.3vw;
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

.main>div>ul>li {
  padding-left: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.main>div>ul>li>img {
  max-height: 5vh;
  width: auto;
  border-radius: 5px;
}

.main>div>button {
  margin: 0;
  margin-left: 30px;
  font-size: 1vw;
  padding: 1vh 2vw;
  background-color: #1db954;
  border-radius: 5px;
}

.main>div>button:hover {
  margin: 0;
  margin-left: 30px;
  font-size: 1vw;
  padding: 1vh 2vw;
  background-color: rgb(29, 185, 84, 0.5);
  border-radius: 5px;
}
</style>