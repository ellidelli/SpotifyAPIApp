<template>
    <section class="sidebar">
        <h1>Explore</h1>
        <button :class="{ active: activeSection === 'global' }" @click="showSection('global')">
            <img src="../assets/home.png">Home
        </button>
        <button :class="{ active: activeSection === 'toptracks' }" @click="showSection('toptracks')">
            <img src="../assets/tracks.png">Top Tracks
        </button>
        <button :class="{ active: activeSection === 'topartists' }" @click="showSection('topartists')">
            <img src="../assets/artists.png">Top Artists
        </button>
    </section>
</template>

<script>
export default {
    data() {
        return {
            activeSection: 'home'
        }
    },
    methods: {
        showSection(section) {
            console.log('Navigating to section:', section);
            try {
                if (this.$route.path !== `/${section}`) {
                    console.log('Navigating...');
                    this.$router.replace(`/${section}`);
                    // Update activeSection when navigating to a new section
                    this.activeSection = section;
                } else {
                    console.log('Already on the requested section.');
                }
            } catch (error) {
                console.error('Error navigating to section:', error);
            }
        },
    },
    created() {
        // Extract the section name from the route path
        this.activeSection = this.$route.path.slice(1);
    }
}
</script>

<style>
.sidebar {
    background-color: rgb(18 18 18);
    border-radius: 10px;
    margin-top: 20px;
    min-height: 95vh;
    height: fit-content;
    width: 13.5vw;
    margin-left: 1vw;
    display: flex;
    flex-direction: column;
}

.sidebar>button {
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
}

.sidebar>button>img {
    max-width: 1.2vw;
    float: left;
    margin-right: 1.2vw;
}

.sidebar button.active {
    background-color: rgb(35, 35, 35);
}

button {
    border-radius: 10px;
    border: none;
    padding: 20px;
    text-decoration: none;
    background-color: rgb(255, 255, 255, 0);
    color: white;
    margin: 2px;
}

button:hover {
    transition: background-color 0.3s;
    background-color: rgb(26 26 26);
}

h1 {
    text-align: left;
    color: white;
    font-family: "Circular", sans-serif;
    font-size: 1.5vw;
    padding-left: 15px;
}

@media screen and (max-width: 600px) {
    .sidebar {
        background-color: rgb(18 18 18);
        border-radius: 10px;
        margin-top: 20px;
        min-height: 5vh;
        height: fit-content;
        width: 99vw;
        margin-left: 1vw;
        margin-top: 1vh;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .sidebar button {
        font-size: 3vw;
        max-height: fit-content;
        max-width: fit-content;
        padding: 1.5vh;
        border-radius: 5px;
        margin-right: 3vw;
        font-weight: 600 !important;
    }

    .sidebar button img {
        max-width: 100%;
        max-height: 3vw;
    }

    .sidebar button.active {
        max-height: 4.5vh;
    }

    .sidebar button:hover {
        max-height: 4.5vh;
    }

    .sidebar h1 {
        display: none;
    }
}
</style>
