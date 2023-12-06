const APIController = (function() {
    
  const clientId = 'Your_Client_ID';
  const clientSecret = 'Your_Client_Secret';

  const _getToken = async () => {

      const result = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
              'Content-Type' : 'application/x-www-form-urlencoded', 
              'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
          },
          body: 'grant_type=client_credentials'
      });

      const data = await result.json();
      return data.access_token;
  }
  

  return {
      getToken() {
          return _getToken();
      }
  }
})();

class API {
    static getSounds = async (token, url) => {

        const result = await fetch(`https://api.spotify.com/v1/artists/${url}/top-tracks?market=TR`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });
    
        const data = await result.json();
        const tracks = await data.tracks
        for (const track of tracks) {
            await API.getAudio(token, track.id)
        }
    }
    static getAudio = async (token, url) => {
        const result = await fetch(`
        https://api.spotify.com/v1/tracks/${url}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });
    
        const data = await result.json();
        const name = await data.name
        const singer = await data.artists[0].name
        const img = await data.album.images[1].url
        const mp3 = await data.preview_url
        API.setAudio(name, singer, img, mp3)
    }

    static setAudio(title, singer, img, mp3) {
        const newTrack = new Music(title, singer, img, mp3)
        musicList.push(newTrack)
        let html = `
        <div class="music">${newTrack.getName()}</div>
        `
        musicListDiv.insertAdjacentHTML("beforeend", html)
        document.querySelector("#sanatciid").value = "";
    }
}
const formSanatci = document.querySelector("#sanatciidarama")
formSanatci.addEventListener("submit", (e) => {
    e.preventDefault()
    if (document.querySelector("#sanatciid").value != "") {
        APIController.getToken().then(data => API.getSounds(data,document.querySelector("#sanatciid").value))
        
    } else {
        document.querySelector("#sanatciid").placeholder = "Please enter an ID..."
    }
});







