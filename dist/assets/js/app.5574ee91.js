(function(){var t={9618:function(t,e,o){"use strict";var r=o(144),i=function(){var t=this,e=t._self._c;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},s=[],a=o(1001),n={},c=(0,a.Z)(n,i,s,!1,null,null,null),l=c.exports,u=o(8345),p=function(){var t=this,e=t._self._c;return e("div",{staticClass:"bg"},[e("section",{staticClass:"case"},[e("h3",[t._v("Statify")]),e("h1",[t._v(" login for your Spotify stats")]),e("button",{on:{click:t.loginToSpotify}},[t._v(" Login to Spotify")])])])},h=[],m=o(7632),f={name:"Home",methods:{loginToSpotify(){const t={response_type:"code",client_id:"b089242ad5d843ca8599f72bb8a125fe",scope:"playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-top-read",redirect_uri:"ellidelli.github.io/SpotifyAPIApp/",state:(0,m.Z)()};return window.location.href=`https://accounts.spotify.com/authorize?${new URLSearchParams(t)}`}}},_=f,d=(0,a.Z)(_,p,h,!1,null,"4e19c18a",null),v=d.exports,T=function(){var t=this;t._self._c;return t._m(0)},g=[function(){var t=this,e=t._self._c;return e("div",[e("h1",[t._v("Loading...")])])}],k=(o(7658),o(9669)),b=o.n(k),y=o(8764);o(129);var S={name:"Callback",created(){if(this.$route.query.code){const t=this.$route.query.code,e=`Basic ${y.lW.from("b089242ad5d843ca8599f72bb8a125fe:13c618eee2fd4862bdcd01e581a6499e").toString("base64")}`;return b().post("https://accounts.spotify.com/api/token",new URLSearchParams({code:t,grant_type:"authorization_code",redirect_uri:"ellidelli.github.io/SpotifyAPIApp/"}).toString(),{headers:{Authorization:e,"Content-Type":"application/x-www-form-urlencoded"}}).then((t=>(sessionStorage.setItem("SPOTIFY_ACCESS_TOKEN",t.data.access_token),this.$router.push("Playlists"))))}}},A=S,P=(0,a.Z)(A,T,g,!1,null,"3d4bfb97",null),w=P.exports,C=function(){var t=this,e=t._self._c;return e("div",{staticClass:"layout"},[e("section",{staticClass:"sidebar"},[e("h1",[t._v("Explore")]),e("ul",[e("li",[e("button",{on:{click:function(e){return t.showSection("home")}}},[t._v("Home")])]),e("li",[e("button",{on:{click:function(e){return t.showSection("topTracks")}}},[t._v("Top Tracks")])]),e("li",[e("button",{on:{click:function(e){return t.showSection("topArtists")}}},[t._v("Top Artists")])])])]),e("section",{staticClass:"main"},["home"===t.activeSection?e("div",[e("h1",[t._v("Lets Get Started")]),e("h2",[t._v("Global Top Tracks")]),e("ul",t._l(t.globalTopTracks,(function(o,r){return e("li",{key:o.id},[e("h3",[t._v(t._s(r+1))]),e("img",{attrs:{src:o.album.images[0].url,alt:"Track Album"}}),e("div",[e("h3",[t._v(t._s(o.name))]),e("h3",[t._v(t._s(o.artists[0].name))])])])})),0)]):"topTracks"===t.activeSection?e("div",[e("h1",[t._v("Your Top Tracks")]),e("button",{on:{click:function(e){return t.getTopTracks("short_term")}}},[t._v("Last 4 Weeks")]),e("button",{on:{click:function(e){return t.getTopTracks("medium_term")}}},[t._v("Last 6 Months")]),e("button",{on:{click:function(e){return t.getTopTracks("long_term")}}},[t._v("All Time")]),e("h2",{staticStyle:{"margin-top":"20px"}},[t._v(t._s(t.trackTimeTitle))]),e("ul",t._l(t.topTracks,(function(o,r){return e("li",{key:o.id},[e("h3",[t._v(t._s(t.trackCount[r]))]),e("img",{attrs:{src:o.album.images[0].url,alt:"Track Album"}}),e("div",[e("h3",[t._v(t._s(o.name))]),e("h3",[t._v(t._s(o.artists[0].name))])])])})),0)]):"topArtists"===t.activeSection?e("div",[e("h1",[t._v("Your Top Artists")]),e("button",{on:{click:function(e){return t.getTopArtists("short_term")}}},[t._v("Last 4 Weeks")]),e("button",{on:{click:function(e){return t.getTopArtists("medium_term")}}},[t._v("Last 6 Months")]),e("button",{on:{click:function(e){return t.getTopArtists("long_term")}}},[t._v("All Time")]),e("h2",{staticStyle:{"margin-top":"20px"}},[t._v(t._s(t.artistTimeTitle))]),e("ul",t._l(t.topArtists,(function(o,r){return e("li",{key:o.id},[e("h3",[t._v(t._s(r+1))]),e("img",{attrs:{src:o.images[0].url,alt:"Artist Image"}}),e("div",[e("h3",[t._v(t._s(o.name))])])])})),0)]):t._e()]),e("section",{staticClass:"acc"},[e("h1",[t._v("Your Account")]),e("section",{staticClass:"info"},[t.profilePhoto?e("img",{attrs:{src:t.profilePhoto,alt:"Profile Photo"}}):t._e(),e("h2",[t._v(t._s(t.username))]),e("h3",[t._v("Followers: "+t._s(t.followersCount))])])])])},O=[],E={name:"Data",data(){return{playlists:[],username:"",profilePhoto:"",followersCount:"",topTracks:[],rank:"",activeSection:"home",stat:null,timeRange:"null",trackTimeTitle:"Past 4 Weeks",artistTimeTitle:"Past 4 Weeks",globalTopTracks:[]}},created(){const t=sessionStorage.getItem("SPOTIFY_ACCESS_TOKEN");if(!t)return this.$router.push("/");b().get("https://api.spotify.com/v1/me",{headers:{Authorization:`Bearer ${t}`}}).then((e=>{this.username=e.data.display_name,console.log(e.data.images),this.profilePhoto=e.data.images[1]?.url||"",this.followersCount=e.data.followers.total||0;const o="37i9dQZEVXbMDoHDwVN2tF";b().get(`https://api.spotify.com/v1/playlists/${o}/tracks`,{headers:{Authorization:`Bearer ${t}`}}).then((t=>{this.globalTopTracks=t.data.items.map((t=>t.track)),console.log(this.globalTopTracks)})).catch((t=>{console.error("Error fetching playlist tracks:",t)})),b().get("https://api.spotify.com/v1/me/top/tracks",{headers:{Authorization:`Bearer ${t}`},params:{time_range:"short_term",limit:50}}).then((t=>{this.topTracks=t.data.items,this.rank+=1})).catch((t=>{console.error("Error fetching top tracks:",t)})),b().get("https://api.spotify.com/v1/me/top/artists",{headers:{Authorization:`Bearer ${t}`},params:{time_range:"short_term",limit:50}}).then((t=>{this.topArtists=t.data.items,this.rank+=1}))})).catch((t=>{console.error("Error fetching username:",t)}))},methods:{showSection(t){this.activeSection=t},getTopTracks(t){const e=sessionStorage.getItem("SPOTIFY_ACCESS_TOKEN");b().get("https://api.spotify.com/v1/me/top/tracks",{headers:{Authorization:`Bearer ${e}`},params:{time_range:t,limit:50}}).then((e=>{this.topTracks=e.data.items,this.rank+=1,"short_term"==t?this.trackTimeTitle="Past 4 Weeks":"medium_term"==t?this.trackTimeTitle="Past 6 Months":"long_term"==t&&(this.trackTimeTitle="All Time")})).catch((t=>{console.error("Error fetching top tracks:",t)}))},getTopArtists(t){const e=sessionStorage.getItem("SPOTIFY_ACCESS_TOKEN");b().get("https://api.spotify.com/v1/me/top/artists",{headers:{Authorization:`Bearer ${e}`},params:{time_range:t,limit:50}}).then((e=>{this.topArtists=e.data.items,this.rank+=1,"short_term"==t?this.artistTimeTitle="Past 4 Weeks":"medium_term"==t?this.artistTimeTitle="Past 6 Months":"long_term"==t&&(this.artistTimeTitle="All Time")})).catch((t=>{console.error("Error fetching top artists:",t)}))}},computed:{trackCount(){return this.topTracks.map(((t,e)=>e+1))}}},$=E,x=(0,a.Z)($,C,O,!1,null,"7243fdaf",null),I=x.exports;r.ZP.use(u.ZP);const Z=[{path:"/",name:"Home",component:v},{path:"/callback",name:"Callback",component:w},{path:"/playlists",name:"Playlists",component:I}],z=new u.ZP({mode:"history",base:"/SpotifyAPIApp/",routes:Z});var L=z;r.ZP.config.productionTip=!1,new r.ZP({router:L,render:t=>t(l)}).$mount("#app")},4654:function(){}},e={};function o(r){var i=e[r];if(void 0!==i)return i.exports;var s=e[r]={exports:{}};return t[r](s,s.exports,o),s.exports}o.m=t,function(){var t=[];o.O=function(e,r,i,s){if(!r){var a=1/0;for(u=0;u<t.length;u++){r=t[u][0],i=t[u][1],s=t[u][2];for(var n=!0,c=0;c<r.length;c++)(!1&s||a>=s)&&Object.keys(o.O).every((function(t){return o.O[t](r[c])}))?r.splice(c--,1):(n=!1,s<a&&(a=s));if(n){t.splice(u--,1);var l=i();void 0!==l&&(e=l)}}return e}s=s||0;for(var u=t.length;u>0&&t[u-1][2]>s;u--)t[u]=t[u-1];t[u]=[r,i,s]}}(),function(){o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,{a:e}),e}}(),function(){o.d=function(t,e){for(var r in e)o.o(e,r)&&!o.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})}}(),function(){o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={143:0};o.O.j=function(e){return 0===t[e]};var e=function(e,r){var i,s,a=r[0],n=r[1],c=r[2],l=0;if(a.some((function(e){return 0!==t[e]}))){for(i in n)o.o(n,i)&&(o.m[i]=n[i]);if(c)var u=c(o)}for(e&&e(r);l<a.length;l++)s=a[l],o.o(t,s)&&t[s]&&t[s][0](),t[s]=0;return o.O(u)},r=self["webpackChunkspotify_app"]=self["webpackChunkspotify_app"]||[];r.forEach(e.bind(null,0)),r.push=e.bind(null,r.push.bind(r))}();var r=o.O(void 0,[998],(function(){return o(9618)}));r=o.O(r)})();
//# sourceMappingURL=app.5574ee91.js.map