$.fn.playAudio = function(opts){
    var startCls = opts && opts.startCls || 'start-audio',
        loadingCls = opts && opts.loadingCls ||'loading-audio',
        pauseCls = opts && opts.pauseCls || 'pause-audio';
    //注册事件
    var className = this.attr('class');
    $('.topic').delegate('.'+className,'click',function(e){
        var node = $(this),
            $audio = node.find('audio'),
            audio = $audio[0];
        $.each($('audio'),function(index,item){
            var _parent = $(this).parent();
            if((_parent.data('isPause')===false) && (_parent[0] !== node[0])){
                _parent.trigger('click');
            }
        });
        if(node.data('isFirstPlay')===undefined){
            //第一次点击要加载音频文件
            node.addClass(loadingCls);
            node.data('isFirstPlay',false);
            //$audio.attr('src',$audio.attr('data-src'));
            $audio.attr('src','/js/123.mp3');
            //表示音频加载了当前帧，可以播放了
            $audio.on('loadeddata',function(){
                node.removeClass(loadingCls).addClass(pauseCls);
                node.data('isPause',false);
                this.play();
            });
            //当音频由于需要缓冲下一帧而停止
            $audio.on('waiting',function(){
                node.addClass(loadingCls).removeClass(pauseCls);
                node.data('isPause',true);
                this.pause();
            });
            //当音频在已因缓冲而暂停或停止后已就绪时
            $audio.on('playing',function(){
                node.removeClass(loadingCls).addClass(pauseCls);
                node.data('isPause',false);
                this.play();
            });
            //在iphone的safari上audio没有waiting,playing, loadeddata的事件。因此需要手动去查询是否完成。
            if(!'playing' in audio){
                function wait(){
                    audio.play();
                    if(audio.currentTime || audio.readyState){
                        node.removeClass(loadingCls).addClass(pauseCls);
                        node.data('isPause',false);
                        node.data('isFirstPlay',false);
                    }else{
                        setTimeout(wait,100);
                    }
                }
                wait();
            }
        }
        if(node.data('isPause')){
            audio.play();
            node.addClass(pauseCls);
            node.data('isPause',false);
            node.data('isFirstPlay',false);
        }else{
            audio.pause();
            $(this).removeClass(pauseCls);
            node.data('isPause',true);
        }
    });
    return this;
}