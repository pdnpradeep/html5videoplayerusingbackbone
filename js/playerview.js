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
				this.progressbar = this.$el.find("#pbar");
				this.timestatus = this.$el.find("#time-container");
				this.playbutton = this.$el.find("#playbutton");
			},
			events:{
				"click #playbutton"	: "playorpause"	
			},
			playorpause:function(){
				if (this.video[0].paused) {
				        this.video[0].play();
				        this.playbutton.attr("src","img/pause.png");
				        this.update = setInterval(this.updatepbar(), 30);
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
			}

		});
		return playerview;
	});