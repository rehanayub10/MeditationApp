const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    //Sounds
    const sounds = document.querySelectorAll('.sound-picker button');

    //Time Display
    const timeDisplay = document.querySelector('.time-display');

    //Get length of outline
    const outlineLength = outline.getTotalLength();
    //console.log(outlineLength);

    //Duration
    let duration = 600;

    // outline.style.strokeDasharray = 100;
    outline.style.strokeDasharray = outlineLength;
    //outline.style.strokeDashoffset = 200;
    
    //play sound
    play.addEventListener('click', () => {
        checkPlaying(song);
    });

    //Create a function specific to stop and play the sounds
    const checkPlaying = song => {
        if(song.paused) {
            song.play();
            video.play();
            play.src = './svg/pause.svg';
        } else {
            song.pause();
            video.pause();
            play.src = './svg/play.svg';
        }
    };

    //We can animate the circle
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = duration - currentTime;
        let seconds = elapsed % 60;
    }
};

app()