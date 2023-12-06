const container = document.querySelector(".container")
const image = document.querySelector(".musicimg")
const title = document.querySelector(".title")
const singer = document.querySelector(".singer")
const prev = document.querySelector(".prev")
const play = document.querySelector(".play")
const next = document.querySelector(".next")
const progressbar = document.querySelector(".progressbar")
const time = document.querySelector(".time")
const audio = document.querySelector("#audio")
const currenttime = document.querySelector(".currenttime")
const soundbar = document.querySelector(".soundbar")
const soundbarIcon = document.querySelector(".soundicon")
const musicListDiv = document.querySelector(".musiclist")
const player = new musicPlayer(musicList)


window.addEventListener("load", () => {
  let music = player.getMusic()
  displayMusic(music);
  updateDropDownMenuList()
})


async function displayMusic(music) {
  title.innerText = music.title
  singer.innerText = music.singer
  image.src = `${music.img}`
  audio.src = `${music.file}`
}

const calculateTime = (toplamSaniye) => {
  const m = Math.floor(toplamSaniye / 60)
  const s = Math.floor(toplamSaniye % 60)
  const updateS = s < 10 ? `0${s}` : `${s}`;
  const sonuc = `${m}:${updateS}`
  return sonuc;
}

audio.onloadedmetadata = () => {
  time.innerText = calculateTime(audio.duration)
  progressbar.max = Math.floor(audio.duration)
  const currentAudio = `${title.outerText} - ${singer.innerText}`
  updateDropDownMenu(currentAudio)
}


audio.addEventListener("timeupdate", () => {
  currenttime.innerText = calculateTime(audio.currentTime);
  progressbar.value = Math.floor(audio.currentTime)
  if(audio.currentTime == audio.duration) {
    next.click();
  }
})

progressbar.addEventListener("input", () => {
  currenttime.textContent = calculateTime(progressbar.value)
  audio.currentTime = progressbar.value;
})


soundbar.addEventListener("input", () => {
  audio.volume = soundbar.value
})

soundbarIcon.addEventListener("click", () => {
  if(soundbarIcon.classList.contains("fa-volume-high")) {
    soundbarIcon.classList.replace("fa-volume-high", "fa-volume-xmark")
    soundbar.value = 0;
    audio.volume = soundbar.value
  } else {
    soundbarIcon.classList.replace("fa-volume-xmark", "fa-volume-high")
    soundbar.value = 0.5;
    audio.volume = soundbar.value
  }
})

next.addEventListener("click", () => {
  player.next()
  let music = player.getMusic()
  displayMusic(music)
  player.playMusic()
})

prev.addEventListener("click", () => {
  player.previous()
  let music = player.getMusic()
  displayMusic(music)
  player.playMusic()
})

play.addEventListener("click", () => {
  if(play.firstChild.classList.contains("fa-play")) {
    player.musicPlay = true;
    player.playMusic()
    play.firstChild.classList.replace("fa-play", "fa-pause")
  } else {
    player.musicPlay = false;
    player.playMusic()
    play.firstChild.classList.replace("fa-pause", "fa-play")
  }
})

function updateDropDownMenuList() {
  for (const music of player.musicList) {
    let html = `
    <div class="music">${music.getName()}</div>
    `
    musicListDiv.insertAdjacentHTML("beforeend", html)
  }
}


document.querySelector(".dropdownmenu").addEventListener("click", () => {
  musicListDiv.classList.toggle("display")
})

function updateDropDownMenu(currentAudio) {
  const musicDivs = document.querySelectorAll(".music")
  for (let musicdiv of musicDivs) {
    if(musicdiv.innerText == currentAudio) {
    musicdiv.style.backgroundColor = "blue";
    } else {
      musicdiv.style.backgroundColor = "whitesmoke";
    }

    musicdiv.addEventListener("click", () => {
      for (let music of player.musicList) {
        if(musicdiv.innerText == music.getName()) {
          displayMusic(music)
          player.index = player.musicList.indexOf(music)
          player.playMusic()
        }
      }
    })
  }
}




