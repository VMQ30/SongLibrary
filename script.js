(function(){
    updateSongList()
    addGenreButton()
    filterSongsByTitle()
    filterSongByArtist()
    filterSongsByGenre()
    filterSongsByGenreSearch()
})()

function setSongList(){
    const defaultSongs = [
        { title: "Shape of You", artist: "Ed Sheeran", genre: "Pop", dateReleased: "06-01-2017", duration: "3:53" },
        { title: "Blinding Lights", artist: "The Weeknd", genre: "Synthetic Pop", dateReleased: "29-11-2019", duration: "3:20" },
        { title: "Rolling in the Deep", artist: "Adele", genre: "Soul", dateReleased: "29-11-2010", duration: "3:48" },
        { title: "Bohemian Rhapsody", artist: "Queen", genre: "Rock", dateReleased: "31-10-1975", duration: "5:55" },
        { title: "Bad Guy", artist: "Billie Eilish", genre: "Pop", dateReleased: "29-03-2019", duration: "3:14" },
        { title: "Hotel California", artist: "Eagles", genre: "Rock", dateReleased: "08-12-1976", duration: "6:30" },
        { title: "Someone Like You", artist: "Adele", genre: "Ballad", dateReleased: "24-01-2011", duration: "4:45" },
        { title: "Smells Like Teen Spirit", artist: "Nirvana", genre: "Grunge", dateReleased: "10-09-1991", duration: "5:01" },
        { title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars", genre: "Funk", dateReleased: "10-11-2014", duration: "4:30" },
        { title: "Shake It Off", artist: "Taylor Swift", genre: "Pop", dateReleased: "18-08-2014", duration: "3:39" }
    ]

    let songList = JSON.parse(localStorage.getItem('songList')) || defaultSongs

    if(!localStorage.getItem('songList')){
        localStorage.setItem('songList', JSON.stringify(songList))
    }

    return songList
}

function updateSongList(){
    const songList = setSongList()
    const grid = document.querySelector(".music-library")
    grid.innerHTML = ''

    songList.forEach((song) => {
        let title = song.title
        let artist = song.artist
        let genre = song.genre
        let dateReleased = song.dateReleased
        let duration = song.duration

        let music = document.createElement('div')
        music.classList.add('music')
        music.innerHTML = `
        <div class = 'song-details'>
            <h2 class = 'music-title'>${title}</h2>
            <p class = 'song-singer'>${artist}</p>
            <p class = 'song-duration'>${duration}</p>
            <p class = 'song-release'>${dateReleased}</p>
        </div>
        <div class = 'song-genre'>${genre}</div>
        `
        grid.appendChild(music)

    })
}

function filter(search, applyFilter){
    const noSongsMessage = document.querySelector('.no-songs')
    search.addEventListener('input', () => {
        let visibleSongs = 0;
        const searchText = search.value.trim().toLowerCase()
        const songCards = document.querySelectorAll('.music')

        noSongsMessage.style.display = 'none'

        songCards.forEach((song) => {
            let filterText = song.querySelector(applyFilter).textContent.trim().toLowerCase()
            if(filterText.includes(searchText)){
                song.style.display = 'flex'
                visibleSongs++
            }
            else{
                song.style.display = 'none'
            }
        })

        if(visibleSongs === 0){
            noSongsMessage.style.display = 'block'
        }
    })

}

function filterSongsByTitle(){
    const search = document.querySelector('.search-title')
    const applyFilter = '.music-title'
    filter(search, applyFilter)
}

function filterSongByArtist(){
    const search = document.querySelector('.search-artist')
    const applyFilter = '.song-singer'
    filter(search, applyFilter)
}

function filterSongsByGenreSearch(){
    const search = document.querySelector('.search-genre')
    const applyFilter = '.song-genre'
    filter(search, applyFilter)
}

function addGenreButton(){
    const songs = document.querySelectorAll('.music')
    const genreList = document.querySelector('.genre-filter')
    let genres = []
    
    songs.forEach((song) => {
        const genreText = song.querySelector('.song-genre').textContent
        if(!genres.includes(genreText)){
            genres.push(genreText)
        }
    })

    genres.forEach((genre) => {
        const button = document.createElement('button')
        button.textContent = genre
        button.classList.add('genre')
        genreList.appendChild(button)
    })
}

function filterSongsByGenre(){
    const genres = document.querySelectorAll('.genre')
    const songCards = document.querySelectorAll('.music')

    genres.forEach((genre) => {
        genre.addEventListener('click', () => {
            clickButtonStyle(genre)
            songCards.forEach((song) => {
                let filterText = song.querySelector('.song-genre').textContent.trim().toLowerCase()
                if(filterText == (genre.textContent.toLowerCase())){
                    song.style.display = 'flex'
                }
                else{
                    song.style.display = 'none'
                }
            })
        })
    })

    const allGenre = document.querySelector('.all-genre')
    allGenre.addEventListener('click', () => {
        songCards.forEach((song) => {
            song.style.display = 'flex'
        })
        clickButtonStyle(allGenre)
    })
}

function clickButtonStyle(button){
    const buttons = document.querySelectorAll('.genre')
    const allGenre = document.querySelector('.all-genre')

    allGenre.classList.remove('pressed')
    buttons.forEach((button) => {
        button.classList.remove('pressed')
    })

    button.classList.add('pressed')
}