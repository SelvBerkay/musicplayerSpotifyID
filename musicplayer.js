class musicPlayer {
  constructor(musicList) {
    this.musicList = musicList
    this.index = 0;
    this.musicPlay = false;
  }


  getMusic() {
    return this.musicList[this.index]
  }

  next() {
    if (this.index + 1 == this.musicList.length) {
      return this.index = 0;
    } else {
      return this.index++;
    }
  }


  previous() {
    if (this.index == 0) {
      this.index = this.musicList.length - 1;
    } else {
      this.index --;
    }
  }

  playMusic() {
    if(this.musicPlay) {
      audio.play()
    } else {
      audio.pause()
    }
  }
}