const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    //Sounds
    const sounds = document.querySelectorAll('.sound-picker button');

    //Time Display
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button');

    //Get length of outline
    const outlineLength = outline.getTotalLength();
    //console.log(outlineLength);

    //Duration
    let duration = 600;

    //outline.style.strokeDasharray = 100;
    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;
    
    //play sound
    play.addEventListener('click', () => {
        checkPlaying(song);
    });

    //select time
    timeSelect.forEach(option => {
        option.addEventListener('click', function() { //traditional formatting to use "this" keyword
            duration = this.getAttribute('data-time');
            //timeDisplay.textContent = `${Math.floor(duration/60)}:${Math.floor(duration % 60)}`;
        });
    });

    //pick different songs/videos
    sounds.forEach(sound => {
        sound.addEventListener('click', function(){
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlaying(song);
        });
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

    //Animate the circle
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        //console.log(currentTime);
        let elapsed = duration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed/60);

        let progress = outlineLength - (currentTime / duration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        //Animate the text
        timeDisplay.textContent = `${minutes}:${seconds}`;

        if (currentTime >= duration) {
            song.pause();
            video.pause();
            currentTime = 0;
            play.src = './svg/play.svg';
        }
    }
};

app()