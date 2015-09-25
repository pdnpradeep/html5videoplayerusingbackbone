define([
		'jquery',
		'underscope',
		'backbone',
		'playermodel',
		],function($,_,Backbone,pmodel){
		var playerview = Backbone.View.extend({
			el:'#player',
			initialize : function(){
				this.video = this.$el.find("#video");
				this.progressbar= this.$el.find("#pbar");
				this.timestatus = this.$el.find("#time-container");
				this.playbutton = this.$el.find("#playbutton");
				this.soundbutton = this.$el.find("#soundbutton");
				this.sbar = this.$el.find("#sbar");
				this.sbarcontainer = this.$el.find("#sbar-container");
				this.progressbarcontainer = this.$el.find("#pbar-container");
				this.fullscreenbutton = this.$el.find("#fullscreenbutton");
				this.mycontrols = this.$el.find("#mycontrols");
				var that= this;
				$( window ).keyup(function(e) {
					that.resizeIT(e);
				});
				
			},
			events:{
				"click #playbutton"			: "playorpause",
				"click #soundbutton"		: "muteandunmute",
				"click #sbar-container"		: "updateSound",
				"click #pbar-container"		: "skippbar",
				"click #fullscreenbutton"	: "fullScreen",
			},
			resizeIT:function(e){
				if (e.keyCode == 27){
					this.resizeVide();
				}
			},
			playorpause:function(){
				if (this.video[0].paused) {
				        this.video[0].play();
				        this.playbutton.attr("src","img/pause.png");
				        var that = this;
				        var update = setInterval(function(){
				        	this.updatepbar();
				        }, 30);
				    } else {
				        this.video[0].pause();
				        this.playbutton.attr("src","img/play.png");
				        window.clearInterval(this.update);
				    }
			},
			updatepbar:function(){
			    var persentage = (this.video[0].currentTime / this.video[0].duration) * 100;
			    var width = persentage + '%';
			    this.progressbar.css("width",width);
			    this.timestatus[0].innerHTML  = this.getVideoTime();
			    if (this.video[0].ended) {
			        	window.clearInterval(this.update);
			          this.playbutton.attr("src","img/replay.png");
			    }
			},
			getVideoTime:function(){
			    var currectVideoTime = this.convertTime(this.video[0].currentTime);
			    var durationVideoTime = this.convertTime(this.video[0].duration);
			    var time = currectVideoTime + '/' + durationVideoTime;
			    return time;
			},
			 convertTime:function(mtime){
			    var Seconds = Math.round(mtime);
			    var Min = Math.floor(Seconds/60);
			    if(Min > 0){
			        Seconds -= Min * 60;
			    }
			    if(Seconds.toString().length == 1){
			        Seconds = '0'+ Seconds;
			    }   
			    var Temptime = Min + ':' + Seconds;
			    return Temptime;
			},
			muteandunmute:function() {
			    if (this.video[0].muted && this.video[0].volume != 0) {
			        this.video[0].muted = 0;
			        this.soundbutton.src = "img/sound.png";
		            this.soundbutton.attr("src", "img/sound.png");
		            this.sbar.css("display","block");
			    } else {
			        this.video[0].muted = 1;
			        this.soundbutton.attr("src", "img/mute.png");
			        this.sbar.css("display","none");
			    }
			},
			updateSound: function(ev){
			    var mposition = parseFloat( ev.pageX - this.sbarcontainer[0].offsetLeft);
			    var width = window.getComputedStyle(this.sbarcontainer[0]).getPropertyValue('width');
			    width = parseFloat(width.substring(0 , width.length - 2));
			    this.video[0].volume= mposition / width;
			    width =  ( mposition / width ) * 100 + '%';
			    this.sbar.css("width",width);
			    if(this.video[0].volume == 0){
			        this.video[0].muted = 0;
			    }else{
			        this.video[0].muted = 1;
			    }
			    this.muteandunmute();
			},
			skippbar: function(ev) {
			    var mposition = parseFloat(ev.pageX - this.progressbarcontainer[0].offsetLeft);
			    width = window.getComputedStyle(this.progressbarcontainer[0]).getPropertyValue('width');
			    width = parseFloat(width.substring(0 , width.length - 2));
			    this.video[0].currentTime = (mposition / width) * video.duration;
			    this.updatepbar();
			},
			fullScreen: function(e){
			    if(this.video[0].webkitDisplayingFullscreen){
			       this.resizeVide();
			    }else
			    if(this.video[0].requestFullscreen){
			        this.video[0].requestFullscreen();
			    }
			    else if(this.video[0].webkitRequestFullscreen){
			            this.video[0].webkitRequestFullscreen();
			            this.mycontrols.css("zIndex","2147483647");
			            this.mycontrols.css("bottom","0px");
			            this.mycontrols.css("position","absolute");
			            this.mycontrols.css("width","100%");
			            this.mycontrols.css("right","0px");
			            this.mycontrols.css("left","0px");
			    }else if(this.video[0].mozRequestFullscreen){
			        this.video[0].mozRequestFullscreen();
			    }else if(this.video[0].msRequestFullscreen){
			        this.video[0].msRequestFullscreen();
			    }
			},
			resizeVide:function() {
			        this.video[0].webkitExitFullScreen();
		            this.mycontrols.css("zIndex","1");
		            this.mycontrols.css("bottom","");
		            this.mycontrols.css("position","relative");
		            this.mycontrols.css("width","100%");
		            this.mycontrols.css("right","");
		            this.mycontrols.css("left","");
			}

		});
		return playerview;
	});