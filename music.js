class Music {
  constructor(title, singer, img, file) {
    this.title = title
    this.singer = singer
    this.img = img
    this.file = file
  }



  getName() {
    return this.title + " - " + this.singer
  }

}



const musicList = [
  new Music("Bay Bay", "Blok3", "img/baybay.png", "mp3/BAYBAY.mp3"),
  new Music("Kol Düğmeleri", "Barış Manço", "img/koldugmesi.jpg", "mp3/koldugmeleri.mp3"),
  new Music("Kontak", "Ezhel", "img/kontak.jpg", "mp3/ezhelkontak.mp3"),
  new Music("Defol", "Lil Zey", "img/lilzeydefol.png", "mp3/defol.mp3"),
  new Music("24/7", "Alizade & Bege", "img/247.jpg", "mp3/247.mp3"),
  new Music("Sevdik de noldu sanki", "Patron", "img/patronsevdik.jpg", "mp3/sevdikdeneoldupatron.mp3")
]







