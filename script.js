(function(){
    updateSongList()
    filterSongsByTitle()
})()

function setSongList(){
    const defaultSongs = [
        { title: "Shape of You", artist: "Ed Sheeran", genre: "Pop", dateReleased: "06-01-2017" },
        { title: "Blinding Lights", artist: "The Weeknd", genre: "Synthetic Pop", dateReleased: "29-11-2019" },
        { title: "Rolling in the Deep", artist: "Adele", genre: "Soul", dateReleased: "29-11-2010" },
        { title: "Bohemian Rhapsody", artist: "Queen", genre: "Rock", dateReleased: "31-10-1975" },
        { title: "Bad Guy", artist: "Billie Eilish", genre: "Pop", dateReleased: "29-03-2019" },
        { title: "Hotel California", artist: "Eagles", genre: "Rock", dateReleased: "08-12-1976" },
        { title: "Someone Like You", artist: "Adele", genre: "Ballad", dateReleased: "24-01-2011" },
        { title: "Smells Like Teen Spirit", artist: "Nirvana", genre: "Grunge", dateReleased: "10-09-1991" },
        { title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars", genre: "Funk", dateReleased: "10-11-2014" },
        { title: "Shake It Off", artist: "Taylor Swift", genre: "Pop", dateReleased: "18-08-2014" }
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

        let music = document.createElement('div')
        music.classList.add('music')
        music.innerHTML = `
        <div class = 'song-details'>
            <h2 class = 'music-title'>${title}</h2>
            <p class = 'song-singer'>${artist}</p>
            <p class = 'song-duration'>${genre}</p>
            <p class = 'song-release'>${dateReleased}</p>
        </div>
        <div class = 'song-genre'>${genre}</div>
        `
        grid.appendChild(music)

    })
}

function filterSongsByTitle(){
    const search = document.querySelector('.search-title')
    search.addEventListener('input', () => {
        const searchText = search.value.toLowerCase().trim()
        const songCard = document.querySelectorAll('.music')

        songCard.forEach((song) => {
            let title = song.querySelector('.music-title').textContent.toLowerCase()
            if(title.includes(searchText)){
                song.style.display = 'flex'
            }
            else{
                song.style.display = 'none'
            }

        })
    })
}