'use strict';

(function() {
    const audioBtns = document.querySelectorAll('.ls_audio button');
    audioBtns.forEach(btn => {
       btn.addEventListener('click', event => {
           const audioPlayer = event.currentTarget.parentNode.querySelector('.player-container-wrapper');
            if (audioPlayer.style.display === "none") {
                audioPlayer.style.display = "block";
            } else {
                audioPlayer.style.display = "none";
            }
       })
    })
})();
