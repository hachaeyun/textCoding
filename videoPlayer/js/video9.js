function refreshPage() {
    location.reload();
}   
// JavaScript
// YouTube API를 비동기로 로드합니다.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 유튜브 비디오 ID
var videoId = "69LD1LqM60Y";

// 비디오 정보를 저장할 변수
var player;
var videoDuration;
var isPlaying = false;
var currentSpeed = 1.0;
var muteButton;
const btnFS = document.getElementById("btnFS");
const refreshBtn = document.getElementById('refreshBtn');

// YouTube API가 준비되면 실행됩니다.
function onYouTubeIframeAPIReady() {
player = new YT.Player('player', {
    height: '100%',
    width: '100%',
    videoId: videoId,
    events: {
    'onReady': onPlayerReady,
    'onStateChange': onPlayerStateChange
    }
});
}

// 비디오가 준비되면 실행됩니다.
function onPlayerReady(event) {
    videoDuration = player.getDuration();
    muteButton = document.querySelector('.sound');
    muteButton.addEventListener('click', toggleMute);
}

// 비디오 상태가 변경될 때 실행됩니다.
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        setInterval(updateProgressBar, 1000);
        $('.btn_play').addClass('play').removeClass('pause');
    }else {
        $('.btn_play').removeClass('play').addClass('pause');
    }
}

// progress bar를 업데이트합니다.
function updateProgressBar() {
    var currentTime = player.getCurrentTime();
    var progressPercent = (currentTime / videoDuration) * 100;
    $('#progress').css('width', progressPercent + '%');
}

// progress bar를 클릭하면, 해당 위치로 동영상을 이동합니다.
$('#progressbar').click(function(event) {
    var x = event.pageX - this.offsetLeft;
    var clickedPosition = (x / $(this).width()) * videoDuration;
    player.seekTo(clickedPosition);
});
// pause 버튼 과 play 버튼 toggle
$('#play-pause').click(function() {
    if (isPlaying) {
        player.pauseVideo();
        isPlaying = false;
        $('.btn_play').removeClass('play').addClass('pause');
    } else {
        player.playVideo();
        isPlaying = true;
        $('.btn_play').addClass('play').removeClass('pause');
    }
});    

// 속도
$('.speedcnt li').on('click', function() { tabActive(this); });
var tabActive = function(obj) {
    $('.speedcnt li').removeClass('active');
    $(obj).addClass('active');
}
$('.spdx10').click(function() {
    currentSpeed = 1.0;
    player.setPlaybackRate(currentSpeed);
});
$('.spdx12').click(function() {
    currentSpeed = 1.2;
    player.setPlaybackRate(currentSpeed);
});
$('.spdx14').click(function() {
    currentSpeed = 1.4;
    player.setPlaybackRate(currentSpeed);
});
$('.spdx18').click(function() {
    currentSpeed = 1.8;
    player.setPlaybackRate(currentSpeed);
});
$('.spdx20').click(function() {
    currentSpeed = 2.0;
    player.setPlaybackRate(currentSpeed);
});
// 
function toggleMute() {
    if (player.isMuted()) {
        player.unMute();
        muteButton.classList.remove('muted');
    } else {
        player.mute();
        muteButton.classList.add('muted');
    }
}        
// 
const openBtn = document.querySelector('#open-btn');
const closeBtn = document.querySelector('#close-btn');
const popup = document.querySelector('#fullscreen-popup');
const popupIframe = document.getElementById("popupIframe");

openBtn.addEventListener('click', () => {
    popup.style.display = 'flex';
});

closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
});   

// ESC 키를 눌렀을 때 팝업 닫기
document.onkeydown = function(event) {
    if (event.keyCode == 27) {
        popup.style.display = 'none';
    }
}    
// 비디오 ID
var videoId2 = "69LD1LqM60Y";

// 비디오 정보를 저장할 변수
var player2;

// YouTube API가 준비되면 실행됩니다.
function onYouTubeIframeAPIReady2() {
    player2 = new YT.Player('player2', {
        height: '100%',
        width: '100%',
        videoId: videoId2
    });
}
// 함수 호출
var checkPlayer2 = setInterval(function() {
    if (typeof YT !== 'undefined' && typeof YT.Player !== 'undefined') {
        onYouTubeIframeAPIReady2();
        clearInterval(checkPlayer2);
    }
}, 1000);   