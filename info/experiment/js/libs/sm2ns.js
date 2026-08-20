/* Sound Manager 2 Native Support 0.2
    Written By: Robert Inglin
    Bind2 function taken from Mootools Library(mootools.net)
   
    CopyRight 2009
*/
var smCreateSound,smUnmuteAll,smMuteAll;
var ua = navigator.userAgent;
var smSupport = {
    Engine:false,
    Version:false,
    compatible:false,
    getEngine: function(){
        if(RegExp("Firefox").test(ua))
                this.Engine = 'Firefox';
        else if(RegExp("Chrome").test(ua))
            this.Engine = 'Chrome';
        else if(RegExp("Safari").test(ua))
            this.Engine = 'Safari';
        //if(RegExp("Chrome").test(ua))
        //      this.Engine = 'Chrome'
       
    },
    getVersion: function(){
        if(!this.Engine)
            this.getEngine();
        if(!this.Version){
            switch(this.Engine){
                case 'Safari':
                    this.Version = ua.replace(/.*Version\/([^ ]*).*/,"$1");
                    this.Version = this.Version.replace(".",'*').replace(/\./g,'').replace(/\*/,'.')*1;
                    if(this.Version >= 3.1)
                        this.compatible = true;
                    break;
                case 'Firefox':
                    this.Version = ua.replace(/.*(Firefox|Shiretoko)\/([^\ ]*).*/,"$2");
                    this.Version = this.Version.replace(".",'*').replace(/\./g,'').replace(/\*/,'.')*1;
                    if(this.Version >= 3.5)
                        this.compatible = true;
                    break;
                case 'Chrome':
                    this.Version = ua.replace(/.*Chrome\/([^ ]*).*/,"$1");
                    this.Version = this.Version.replace(".",'*').replace(/\./g,'').replace(/\*/,'.')*1;
                    if(this.Version >= 3.01822)
                        this.compatible = true;
                    break;
            }
        }
    }
}
smSupport.getVersion();
function createNativeSupport(){
    if(soundManager && smSupport.compatible){
        soundManager.oggList = [];
        smCreateSound = soundManager.createSound.bind2(soundManager);
        soundManager.createSound = function(options){
            if(options.nativeSupport || (smSupport.Engine == 'Chrome' && options.Chrome) || (options.ogg && smSupport.Engine == 'Firefox') || (options.Safari && smSupport.Engine == 'Safari' )){//Basic check will change
                if(options.nativeSupport !== true)
                    options.url = options.nativeSupport;
                if(smSupport.Engine == 'Firefox')
                    options.url = (!options.ogg || options.ogg === true)?options.url.replace(/mp3/g,'ogg'):options.ogg;
                if(smSupport.Engine == 'Safari' && options.Safari && options.Safari !== true)
                    options.url = options.Safari;
                if(smSupport.Engine == 'Chrome'){
                    if(options.Chrome && options.Chrome !== true)
                        options.url = options.Chrome;
                    else if(options.Chrome == 'ogg'){
                        options.url = (!options.ogg || options.ogg === true)?options.url.replace(/mp3/g,'ogg'):options.ogg;
                    }
                }
                console.log(options.url);
                var audioObj = {
                        url:options.url,
                        ogg:true,
                        paused:false,
                        stopped:true,
                        pausedAt:0,
                        muted:false,
                        playbackRate:1,
                        volume:(options.volume)?options.volume:0,
                        autoPlay:(options && options.autoPlay)?true:false,
                        loop:(options && options.loop)?true:false,
                        element:document.createElement('audio'),
                        play: function(){
                            if(!this.paused && !this.stopped)
                                return false;
                            if((this.element.duration <1 && smSupport.Engine == 'Firefox') || (smSupport.Engine == 'Chrome' && !this.paused) ){//Firefox audio bug with files under 1 second in length
                                this.element.pause();
                                delete this.element;//may or may not work....
                                this.element = document.createElement('audio');
                                this.element.src = this.url;
                                this.element.autobuffer = true;
                                if(this.playbackRate != 1)
                                    this.setPlaybackRate(this.playbackRate);
                            }
                           
                            if(this.muted)
                                this.element.volume = 0;
                            else if(this.volume !=0 && this.element.volume != this.volume/100)
                                this.setVolume(this.volume);
                               
                            if(this.volume == 0)
                                this.volume = this.element.volume*100;
                           
                            if(smSupport.Engine == 'Chrome');
                            else if(this.pausedAt)
                                    this.setPosition(this.pausedAt);
                            else
                                    this.setPosition(0);
                            this.element.play();
                            this.paused = false;
                            this.stopped = false;
                            this.pausedAt = 0;
                        },
                        resume: function(){
                            this.play();
                        },
                        pause: function(){
                            this.pausedAt = this.element.currentTime * 1000;
                            this.paused = true;
                            this.element.pause();
                        },
                        togglePause: function(){
                            if(this.paused)
                                this.resume();
                            else
                                this.pause();
                        },
                        stop: function(){
                            this.element.pause();
                            this.pausedAt = 0;
                            this.element.currentTime = 0;
                            this.stopped = true;
                            this.paused =false;
                        },
                        mute: function(){
                            if(!this.volume)this.volume = this.element.volume*100;
                            this.muted = true;
                            this.element.volume = 0;
                        },
                        unmute: function(){
                            this.muted = false;
                            this.element.volume = this.volume/100;
                        },
                        setVolume: function(volume){
                            if(volume>100)
                                this.volume = volume = 100;
                            this.volume = (volume>100)?100:volume;
                            this.element.volume = this.volume/100;
                        },
                        setPlaybackRate: function(pbr){
                            if(!pbr)pbr = this.element.defaultPlaybackRate || this.element.playbackRate || 1;//set default if no arguments
                            this.element.playbackRate = pbr;
                            this.playbackRate = pbr;
                        },
                        setPosition: function(Msec){
                            if(Msec/1000 >= this.element.duration)
                                return false;
                            this.element.currentTime = (Msec/1000);
                        },
                        setPan: function(){
                            return false;//no pan options in <audio> tag <!-- s:( --><img src=\"{SMILIES_PATH}/icon_e_sad.gif\" alt=\":(\" title=\"Sad\" /><!-- s:( -->
                        },
                        checkPlayFinish: function(){
                            if(this.element && this.element.ended){
                                this.stop();
                                if(this.loop)
                                    this.play();
                            }
                        }.bind2(this)
                    };
                audioObj.element.src = audioObj.url;
                audioObj.element.autobuffer = true;
                var smolen = soundManager.oggList.length;
                soundManager.oggList[smolen] =  audioObj;
                audioObj.smoid = smolen;
                setInterval(soundManager.oggList[smolen].checkPlayFinish,30);
                if(audioObj.autoPlay)
                    audioObj.play();
                return soundManager.oggList[smolen];
            }
            else
            return smCreateSound(options);
        }
        smMuteAll = soundManager.muteAll.bind2(soundManager);
        soundManager.muteAll = function(options){
            smMuteAll();
            var i = soundManager.oggList.length-1;
            if(i<0)
                return false;
            do{
                soundManager.oggList[i].mute();
            }while(i--);
        }
        smUnmuteAll = soundManager.unmuteAll.bind2(soundManager);
        soundManager.unmuteAll = function(options){
            smUnmuteAll();
            var i = soundManager.oggList.length-1;
            if(i<0)
                return false;
            do{
                soundManager.oggList[i].unmute();
            }while(i--);
        }
        smStopAll = soundManager.stopAll.bind2(soundManager);
        soundManager.stopAll = function(options){
            smStopAll();
            var i = soundManager.oggList.length-1;
            if(i<0)
                return false;
            do{
                soundManager.oggList[i].stop();
            }while(i--);
        }
        smResumeAll = soundManager.resumeAll.bind2(soundManager);
        soundManager.resumeAll = function(options){
            smResumeAll();
            var i = soundManager.oggList.length-1;
            if(i<0)
                return false;
            do{
                soundManager.oggList[i].resume();
            }while(i--);
        }
        smPauseAll = soundManager.pauseAll.bind2(soundManager);
        soundManager.pauseAll = function(options){
            smPauseAll();
            var i = soundManager.oggList.length-1;
            if(i<0)
                return false;
            do{
                soundManager.oggList[i].pause();
            }while(i--);
        }
    }
}
Function.prototype.bind2 = function(bind,options){
    var self = this;
    options = options || {};
    return function(event){
        var args = options.arguments;
        if(args == undefined)
            args = Array.slice(arguments, (options.event) ? 1 : 0);
        else{
            if(typeof(args) != 'array' && !args.callee){
                args = [args];
            }
        }
        return self.apply(options.bind || null, args);
    }
       
}