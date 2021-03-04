const piano = document.querySelector('.piano');
const notesBtn = document.querySelector('.btn-notes')
const lettersBtn = document.querySelector('.btn-letters')
const fullscreenBtn = document.querySelector('.fullscreen')




piano.addEventListener('mousedown', (event) => keypress(event));
piano.addEventListener('mouseover', (event) => {
    if (event.buttons == 1 || event.buttons == 2) keypress(event)
});
window.addEventListener('keydown', (event) => keypress(event))



piano.addEventListener('mouseup', (event) => releaseKey(event));
piano.addEventListener('mouseout', (event) => {
    if (event.buttons == 1 || event.buttons == 2) releaseKey(event)
});
window.addEventListener('keyup', (event) => releaseKey(event))



notesBtn.onclick = function activateNotes () {

    notesBtn.classList.add('btn-active')
    lettersBtn.classList.remove('btn-active')
    for (let elem of document.getElementsByClassName('piano-key'))
        elem.classList.remove('letter')

}
lettersBtn.onclick = function activateLetters() {

    lettersBtn.classList.add('btn-active')
    notesBtn.classList.remove('btn-active')
    for (let elem of document.getElementsByClassName('piano-key'))
        elem.classList.add('letter')

}


function keypress(e) {
    if (e.repeat) return
    const key = piano.querySelector(`.piano-key[data-letter="${(e.code + "")[3]}"]`) || e.target
    if (!key.getAttribute('data-note')) return
    const src = `./assets/audio/${key.getAttribute('data-note')}.mp3`
    key.classList.add('piano-key-active')
    playAudio(src)
}

function releaseKey(e) {
    const key = piano.querySelector(`.piano-key[data-letter="${(e.code + "")[3]}"]`) || e.target
    key.classList.remove('piano-key-active')

}

function playAudio(src) {
    const audio = new Audio();
    audio.src = src;
    audio.currentTime = 0;
    audio.play()

}

fullscreenBtn.onclick = function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}


