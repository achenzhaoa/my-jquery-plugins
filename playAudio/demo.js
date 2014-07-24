/*
* 格式必须是 <div class=".comment-item-audio">
*               <audio data-src="test.mp3"></audio>
*          </div>
* */
$('.comment-item-audio').playAudio({
    startCls    :'comment-item-audio',
    loadingCls  :'bar-loading',
    pauseCls    :'bar-play'
});