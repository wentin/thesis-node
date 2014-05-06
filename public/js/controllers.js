function MainCntl($scope, $http, calendarList, userProfile, eventList) {
	$scope.calendarList = calendarList;
	$scope.userProfile = userProfile;
	$scope.eventList = eventList;

	// console.log(eventList.items[0].start.dateTime);
	var firstDay = moment(eventList.items[0].start.dateTime);
	firstDay.seconds(0).minute(0).hour(0);
	
	var lastDay = moment(eventList.items[eventList.items.length-1].start.dateTime);
	lastDay.seconds(0).minute(0).hour(0);

	var days = lastDay.diff(firstDay, 'days');
	console.log('days: '+days);


	var calHeight = days * 2400;
	console.log('calHeight: '+calHeight);
	var oneDayText = "00:00<br>01:00<br>02:00<br>03:00<br>04:00<br>05:00<br>06:00<br>07:00<br>08:00<br>09:00<br>10:00<br>11:00<br>12:00<br>13:00<br>14:00<br>15:00<br>16:00<br>17:00<br>18:00<br>19:00<br>20:00<br>21:00<br>22:00<br>23:00<br>";
	var html = '';
	for (var i=0;i<days;i++){ 
		html += oneDayText;
	}
	$('.timeLeft, .timeRight').html(html);

	$scope.getHourMinute = function (time) {
        var HHmm =  moment(time).format('HH:mm');
        return HHmm;
    };
    
    $scope.getTopHeight = function (event) {
    	var startTime = moment(event.start.dateTime);
    	var endTime   = moment(event.end.dateTime);
    	var top = startTime.diff(firstDay, 'minutes') / 60 * 100;
    	var height = endTime.diff(startTime, 'minutes') / 60 * 100;

		// console.log('top: '+top);
		// console.log('height: '+height);

    	return {	
        	top: top + 'px',
        	height: height + 'px'
        };
    };

    $scope.moduleOn = function() {
	    $('.module.editAfter').addClass('on');	
    };

    $scope.today =  function(){
		$('.calHead input[type=date]').trigger("change");
    	return moment().format('YYYY-MM-DD');
    }

	angular.element(document).ready(function () {
        
        //Iscroll for the calendar wrapper
		/*var calScroll = new IScroll('.calendarWrapper', {
		    mouseWheel: true,
		    scrollbars: true,
		    fadeScrollbars: true,
		});*/

		var now = moment();
		var nowTop = now.diff(firstDay, 'minutes') / 60 * 100 - 24;
		//update div#now with current time every 60s
		setInterval(function(){
			var now = moment();
			var nowTop = now.diff(firstDay, 'minutes') / 60 * 100 - 24;
			$('#now').css('top', nowTop);
			$('#now i').html( now.format('HH:mm') );
		},60);


	    // scroll to put the "now" in center
	    /*calScroll.scrollTo(0,  214 - nowTop, 200);*/
		$('.calendarWrapper').scrollTop( nowTop- 190 );

		// calendar header date picker function
		$('.todayButton').hammer().on('tap', function(){
			$('.calendarWrapper').scrollTop( nowTop- 190 );			
		})

		$('.weekday, .date').hammer().on('tap', function(){
			$(this).siblings('input[type=date]').focus();	
		})

		$('input[type=date]').change(function(){
			var selectDate = moment($(this).val());
			var today = moment(new Date().setHours(0,0,0,0));
			if( selectDate.diff(today, 'days') == 0) {
				$('.weekday').html('today');
			} else if (selectDate.diff(today, 'days') == 1 ) {
				$('.weekday').html('tomorrow');
			} else if (selectDate.diff(today, 'days') == -1) {
				$('.weekday').html('yesterday');
			} else {
				$('.weekday').html(selectDate.format('dddd'));
			}
			$('.date i').html(selectDate.format('DD'));
			$('.date span').html(selectDate.format('ddd'));

		})


		$('.calHead .prevDate').hammer().on('tap', function(){
			var currentDate = moment($('.calHead input[type=date]').val());
			var prevDate = currentDate.clone().date(currentDate.date()-1).format('YYYY-MM-DD');
			$('.calHead input[type=date]').val(prevDate);
			$('.calHead input[type=date]').trigger("change");
		})
		$('.calHead .nextDate').hammer().on('tap', function(){
			var currentDate = moment($('.calHead input[type=date]').val());
			var nextDate = currentDate.clone().date(currentDate.date()+1).format('YYYY-MM-DD');
			$('.calHead input[type=date]').val(nextDate);
			$('.calHead input[type=date]').trigger("change");
		})
		/*$('.calHead').hammer().on('dragup', function(){
			var currentDate = $('input[type=date]', this).val();
			console.log('trigger');
			var prevDate = moment(currentDate).day(-1).format('YYYY-MM-DD');
			$('input[type=date]', this).val(prevDate);
		})*/

		// calendar header date picker function ends

		$('.inviteButton').hammer().on('tap', function(){
			$(this).toggleClass('on').toggleClass('off');		
		})

	    function setClock(h, m) {
	    	if ( h >= 12) {
	    		h -= 12;
	    	}
	    	/*if ( m >= 60) {
	    		m-= 60;
	    	}*/
	    	console.log('h: ' + h + '; m: ' + m);
	    	hDeg = h/12*360 + m/60*30 - 90;
	    	mDeg = m/60*360 - 90;

	    	var hour = $('.hourHand')[0];
	    	var min = $('.minHand')[0];

		    hour.style.webkitTransform = 'rotate('+hDeg+'deg)'; 
		    hour.style.mozTransform    = 'rotate('+hDeg+'deg)'; 
		    hour.style.msTransform     = 'rotate('+hDeg+'deg)'; 
		    hour.style.oTransform      = 'rotate('+hDeg+'deg)'; 
		    hour.style.transform       = 'rotate('+hDeg+'deg)'; 
		    min.style.webkitTransform = 'rotate('+mDeg+'deg)'; 
		    min.style.mozTransform    = 'rotate('+mDeg+'deg)'; 
		    min.style.msTransform     = 'rotate('+mDeg+'deg)'; 
		    min.style.oTransform      = 'rotate('+mDeg+'deg)'; 
		    min.style.transform       = 'rotate('+mDeg+'deg)'; 
	    }
	    function replaceHtml(el, html) {
			var oldEl = typeof el === "string" ? document.getElementById(el) : el;
			var newEl = oldEl.cloneNode(false);
			newEl.innerHTML = html;
			oldEl.parentNode.replaceChild(newEl, oldEl);
			return newEl;
		};
	    function Carousel(element)
	    {
	        var self = this;
	        element = $(element);

	        var container = $(">.ul", element);
	        var panes = $(">.ul>.panel", element);

	        var current_pane = 1;

	        /**
	         * show pane by index
	         */
	        this.showPane = function(index, animate) {
	            // between the bounds
	            current_pane = index;

	            if (index == 0){
	            	offset = 0;
	            	$('.panel').removeClass('active');
	            	$('.leftPanel').addClass('active');

	            	$('.left.event').addClass('side');
	            } else if (index == 1){
	            	offset = -276;
	            	$('.panel').removeClass('active');
	            	$('.mainPanel').addClass('active');
	            	$('.event').removeClass('side');
	            } else if (index == 2){
	            	offset = -552;
	            	$('.panel').removeClass('active');
	            	$('.rightPanel').addClass('active');
	            	$('.right.event').addClass('side');
	            }
	            setContainerOffset(offset, animate);
	        };


	        function setContainerOffset(pixel, animate) {
	            container.removeClass("animate");

	            if(animate) {
	                container.addClass("animate");
	            }

	            if(Modernizr.csstransforms3d) {
	                container.css("transform", "translate3d("+ pixel +"px,0,0) scale3d(1,1,1)");
	            }
	            else if(Modernizr.csstransforms) {
	                container.css("transform", "translate("+ pixel +"px,0)");
	            }
	            else {
	                //var px = ((pane_width*pane_count) / 100) * percent;
	                container.css("left", pixel+"px");
	            }
	        }

	        this.next = function() { return this.showPane(current_pane+1, true); };
	        this.prev = function() { return this.showPane(current_pane-1, true); };



	        function handleHammer(ev) {
	            // console.log(ev);
	            // disable browser scrolling
	            ev.gesture.preventDefault();

	            panelSwitch = !$('.module').hasClass('on');
	            if(panelSwitch){
		            switch(ev.type) {
		                case 'dragright':
		                case 'dragleft':
		                    // stick to the finger
		                    var drag_offset = ev.gesture.deltaX;

		                    // slow down at the first and last pane
		                    if((current_pane == 0 && ev.gesture.direction == "right") ||
		                        (current_pane == 2 && ev.gesture.direction == "left")) {
		                        drag_offset *= .4;
		                    }
		                    if (current_pane == 0){
				            	pane_offset = 0;
				            } else if (current_pane == 1){
				            	pane_offset = -276;
				            } else if (current_pane == 2){
				            	pane_offset = -552;
				            }
		                    setContainerOffset(drag_offset + pane_offset);
		                    break;

		                case 'swipeleft':
		                    self.next();
		                    ev.gesture.stopDetect();
		                    break;

		                case 'swiperight':
		                    self.prev();
		                    ev.gesture.stopDetect();
		                    break;

		                case 'release':
		                    // more then 50% moved, navigate
		                    if(Math.abs(ev.gesture.deltaX) > 80) {
		                        if(ev.gesture.direction == 'right') {
		                            self.prev();
		                        } else {
		                            self.next();
		                        }
		                    }
		                    else {
		                        self.showPane(current_pane, true);
		                    }
		                    break;
		            }	
	            }
	            
	        }

	        $(element).hammer({ drag_lock_to_axis: true }).on("release dragleft dragright swipeleft swiperight", handleHammer);
	        $(element).hammer().on("tap swiperight", '.myProfile', function(event) {
	        	if( $('.leftPanel').hasClass('active') ){
					self.next();
	        	} else {
					self.prev();
	        	}
	        });
	        $(element).hammer().on("tap swipeleft", '.friendProfile', function(event) {
	        	if( $('.rightPanel').hasClass('active') ){
					self.prev();
	        	} else {
					self.next();
	        	}
	        });
	    }
	    var carousel = new Carousel("#wrapper");

	    $('.addButton').hammer().on('tap', function(){
	        $('.module.add').addClass('on');
	    })

	    $('.calendar').hammer().on("tap", '.event', function(event) {
	        $('.module.editAfter').addClass('on');
		});

	    $('.taskTime').hammer().on('tap', function(){
	        $('.module.editTime').addClass('on');
	        var hour = $('span:eq(0)', this).html();
	        var min  = $('span:eq(1)', this).html();
	        if( parseInt(hour)>11 && $('.ampmswitch').html() == 'am' ){
	        	$('.ampmswitch').html('pm');
	    		$('.hourWrapper').toggleClass('active');
	        } else if ( parseInt(hour)<=11 && $('.ampmswitch').html() == 'pm' ){
	        	$('.ampmswitch').html('am');
	    		$('.hourWrapper').toggleClass('active');	
	        } 
	        $('.module.editTime .hourWrapper div, .module.editTime .minWrapper div').removeClass('select');
	        $('.module.editTime .hourWrapper div:contains("'+hour+'")').addClass('select');
	        $('.module.editTime .minWrapper div:contains("'+min+'")').addClass('select');

	    })

	    $('.ampmswitch').hammer().on('tap', function(){
	    	if($(this).html() == 'am') {
	    		$(this).html('pm');
	    	}else{
	    		$(this).html('am');
	    	}
	    	$('.hourWrapper').toggleClass('active');
	    })

	    $('.taskLength').hammer().on('tap', function(){
	        $('.module.editLength').addClass('on');
	        
	        var currentTaskTime = moment( $(this).prev('.taskTime').text(), 'HH:mm');
	        var currentDurationHour = $(this).children('span:eq(0)').html();
	        var currentDurationMin = $(this).children('span:eq(1)').html();
	        var iniTaskEndTime = currentTaskTime.add({hours: currentDurationHour, minutes: currentDurationMin});

	        //initialize the length module by setting the 4 things: length text, endTime text, length bar height, clock display
	        $('.endTime').html('<span>'+iniTaskEndTime.format('HH')+'</span>'+':'+'<span>'+iniTaskEndTime.format('mm')+'</span>');
	        $('.length').html('<span>'+currentDurationHour+'</span> h <span>'+currentDurationMin+'</span> m');
	        var lengthBarHeight = currentDurationHour * 120 + currentDurationMin * 2;
	        $('.lengthBar').css('height', lengthBarHeight+'px');
	        setClock( iniTaskEndTime.hours(), iniTaskEndTime.minutes() );
	        // console.log('lengthBarHeight: ' + lengthBarHeight);
	    })

	    $('.taskProject').hammer().on('tap', function(){
	        $('.module.setProject').addClass('on');
	        
	        var currentPercentage = $('.percentage i', this).html();
	        var currentProject = $('.taskProjectName', this).html();

	        //initialize the set project module by setting the 3 things: selected project, percentage number text, percentage slider width
	        $('.module.setProject .li, .module.setProject li').removeClass('selected');
	        $('.module.setProject ul.projectSelector li:contains('+currentProject+')').addClass('selected');

	        $('.module.setProject .numbers i').html(currentPercentage);

	        var initWidth = $('.percentageBar').width()*currentPercentage/100;
	        $('.percentageSlider').css('width', initWidth + 'px');
	    })

	    $('.checkpoint').hammer().on('tap', function(){
	        $('.module.setCheckpoint').addClass('on');
	    })

		var currentHeight, currentTaskHour, currentTaskMin, currentTaskTime;
	    $('.editLength').on("drag dragstart dragend", function (event) {
	        event.gesture.preventDefault();
		    switch(event.type) {
		        case 'touch':
		             break;
		        case 'drag':
		             var posY = event.gesture.deltaY;

		             // 4 things has to be reset when dragging:
		             // length text, endTime text, length bar height, clock display

		             //set the lengthBar height when dragging
		             var lengthBarHeight = posY + currentHeight;
		             $('.lengthBar').css("height", lengthBarHeight+"px");

		             // set the clock display when dragging
		             var durationHour = Math.floor(lengthBarHeight/120);
		             var durationMin = lengthBarHeight/2 - durationHour*60;
		             var clockHour = parseInt(currentTaskHour) + durationHour;
		             var clockMin = parseInt(currentTaskMin) + durationMin;
		             console.log('clockHour: '+clockHour);
		             if(clockMin >= 60) {
		             	clockMin -= 60;
		             	clockHour += 1;
		             }
		             /*if(clockHour >= 12) {
		             	clockHour -= 12;
		             }*/
		             var clockTime = currentTaskTime.clone().add({hours:durationHour,minutes:durationMin})
	        		 setClock(clockHour, clockMin);

	        		 clockMin = Math.floor(clockMin);
	        		 clockMin = (clockMin > 9)?clockMin:'0'+clockMin;
	        		 clockHour = (clockHour > 9)?clockHour:'0'+clockHour;

	        		 durationMin = Math.floor(durationMin);
	        		 durationMin = (durationMin > 9)?durationMin:'0'+durationMin;
	        		 durationHour = (durationHour > 9)?durationHour:'0'+durationHour;
	        		
	        		 // duration = clockTime.diff(currentTaskTime);
	        		 // durationMin = clockTime.diff(currentTaskTime, 'minutes');
	        		 // moment.utc(duration).format("HH:mm:ss.SSS")
	        		 // durationHour = moment.utc(duration).format("HH");
	        		 // durationMin = moment.utc(duration).format("mm");

		            // set the length text, endTime text when dragging
	        		var endTimeEl = document.querySelector('.endTime');
	        		var lengthEl  = document.querySelector('.length');
	        		if(!(clockMin % 5)){
	        			endTimeEl = replaceHtml(endTimeEl, '<span>'+clockTime.format('HH')+'</span>'+':'+'<span>'+clockMin+'</span>');
	        			lengthEl  = replaceHtml(lengthEl, '<span>'+durationHour+'</span> h <span>'+durationMin+'</span> m');
	        		 }
		             break;
		        case 'dragstart':
		             currentHeight = $('.module.on .lengthBar').height();
		             currentTaskHour = $('.module.on .taskTime span:eq(0)').html();
		             currentTaskMin = $('.module.on .taskTime span:eq(1)').html();
		             currentTaskTime = moment().hours(currentTaskHour).minutes(currentTaskMin);
		             break;
		        case 'dragend':
		             break;
		    }     
		});
		
		var currentWidth;
		var fullWidth = $('.percentageBar').width();
		$('.setPercentage').on("drag dragstart dragend", function (event) {
	        event.gesture.preventDefault();
		    switch(event.type) {
		        case 'touch':
		             break;
		        case 'drag':
		             var posY = event.gesture.deltaX;

		             //set the percentageSlider Width when dragging
		             var percentageSliderWidth = posY + currentWidth;
		             if(percentageSliderWidth >= fullWidth) {
		             	percentageSliderWidth = fullWidth;
		             }
		             if(percentageSliderWidth <= 0) {
		             	percentageSliderWidth = 0;
		             }
		             $('.percentageSlider').css("width", percentageSliderWidth+"px");

		            var percentage = parseInt(percentageSliderWidth/fullWidth*100);
	        		var percentageEl = document.querySelector('.numbers i');
		             if(percentage <= 25 || !(percentage % 5)){
	        			percentageEl = replaceHtml(percentageEl, percentage);
	        		 }
		             
		             break;
		        case 'dragstart':
		             currentWidth = $('.percentageSlider').width();
		             break;
		        case 'dragend':
		             break;
		    }     
		});
		
		var currentSliderLeft;
		var sliderLeft;
		var maxSliderLeft = 169.5;
		var minSliderLeft = -3.5;
		$('.statusSliderWrapper').on("drag dragstart dragend", function (event) {
	        event.gesture.preventDefault();
		    switch(event.type) {
		        case 'touch':
		             break;
		        case 'drag':
		             var posX = event.gesture.deltaX;

		             //set the percentageSlider Width when dragging
		             sliderLeft = posX + currentSliderLeft;
		             if(sliderLeft >= maxSliderLeft) {
		             	sliderLeft = maxSliderLeft;
		             }
		             if(sliderLeft <= minSliderLeft) {
		             	sliderLeft = minSliderLeft;
		             }
		             $('.slider').css("left", sliderLeft+"px");
		             
		             console.log('sliderLeft: ' + sliderLeft);
		             $('.slider').css("opacity", 1-Math.abs( (sliderLeft-82.5)/87 ) );

		             break;
		        case 'dragstart':
		             currentSliderLeft = parseFloat($('.slider').css('left'));
					 $('.slider').removeClass("animate");
		             break;
		        case 'dragend':
                    if(Math.abs(event.gesture.deltaX) > 30) {
                        if(event.gesture.direction == 'right') {
                            $('.slider').css("left", maxSliderLeft+"px");
                            $('.slider').removeClass('fail').addClass("success");
                            $('.failIcon').removeClass("selected");
                            $('.successIcon').addClass("selected");
                            $('.module.on .projectAfter').addClass('success');
		             		$('.slider').css("opacity", 1-Math.abs( (maxSliderLeft-82.5)/87 ) );

	        				$('.module.setCheckpoint').addClass('on');
                        } else {
                            $('.slider').css("left", minSliderLeft+"px");
                            $('.slider').removeClass('success').addClass("fail");
                            $('.module.on .projectAfter').removeClass('success');
                            $('.successIcon').removeClass("selected");
                            $('.failIcon').addClass("selected");
		             		$('.slider').css("opacity", 1-Math.abs( (minSliderLeft-82.5)/87 ) );
							$('.module.on .checkpoint').removeClass('icon-link').removeClass('icon-chat');
                        }
                    }
                    else {
		            	$('.slider').css("left", currentSliderLeft+"px");
		             	$('.slider').css("opacity", 1-Math.abs( (currentSliderLeft-82.5)/87 ) );	
                    }
					$('.slider').addClass("animate");
                    break;
		    }     
		});

	    $('.setParentProject .li, .setParentProject li').hammer().on('tap', function(){
	        $('.setParentProject .li, .setParentProject li').removeClass('selected');
	        $(this).addClass('selected');
	    })


	    $('.setCheckpoint li').hammer().on('tap', function(event){
			event.gesture.preventDefault();
	        $('.setCheckpoint li').removeClass('selected');
	        $(this).addClass('selected');
	    })

	    $('.module.editLength .ok').hammer().on("tap", function(e){
	        var duration = $('.module.on .length').html();
	        $('.module.on .taskLength').html(duration);
	    })


	    $('.module.setProject .ok').hammer().on("tap", function(e){
	        var percentage = $('.module.on .percentageBar .numbers i').html();
	        var parentProject;
	        if($('.setParentProject .li').hasClass('selected')){
	        	console.log('val: ' + $('.setParentProject .selected input').val());
				if( $('.setParentProject .selected input').val() != '' ){
					parentProject = $('.setParentProject .selected input').val();
				} else {
					parentProject = 'Set Parent Project';
				}
	        } else if($('.setParentProject li').hasClass('selected')){
				parentProject = $('.setParentProject .selected').html();
	        } else {
	        	parentProject = 'Set Parent Project';
	        	percentage = 10;
	        }
	        $('.module.on .percentage i').html(percentage);
	        $('.module.on .taskProject .taskProjectName').html(parentProject);
	        $('.module.on .projectAfter').css('width', percentage+'%');
	    })

	    $('.module.setCheckpoint .ok').hammer().on("tap", function(e){
	        if($('.setCheckpoint .icon-link').hasClass('selected')){
				if( $('.setCheckpoint .selected input').val() != ''){
					$('.module.on .checkpoint').removeClass('icon-chat').addClass('icon-link')
					.attr('href', $('.setCheckpoint .selected input').val());
				} else {
					$('.module.on .checkpoint').removeClass('icon-link').addClass('icon-chat');
				}
	        } else if($('.setCheckpoint .icon-chat').hasClass('selected')){
					$('.module.on .checkpoint').removeClass('icon-link').addClass('icon-chat');
	        } else {
	        }
	    })

	    $('.module .ok, .module .cancel').hammer().on("tap", function(e){
	        $(this).parents('.module').removeClass('on');
	    })

	    $('.hourWrapper div').hammer().on("tap swipeup swipedown drag dragend", function(event){
	        
	        event.gesture.preventDefault();
		    switch(event.type) {
		        case 'tap':
		        	$('.hourWrapper div').removeClass('select');
	        		$(this).addClass('select');
		             break;
		        case 'drag':
		             break;
		        case 'dragstart':
		             break;
		        case 'dragend':
                    break;
		        case 'swipeup':
		             break;
		        case 'swipedown':
		             break;
		    }  
	    })

	    $('.minWrapper div').hammer().on("tap", function(e){
	        $(this).siblings('div').removeClass('select');
	        $(this).addClass('select');
	    })

	    $('.module.editTime .ok').hammer().on("tap", function(e){
	        var hour = $('.hourWrapper div.select').text();
	        var min = $('.minWrapper div.select').text();
	        $('.module.on .taskTime').html('<span>'+hour+'</span>'+':'+'<span>'+min+'</span>');
	    })

	    $('.tabs .tab').hammer().on("tap", function(e){
	        e.gesture.preventDefault();
	        var href = $(this).attr('href');
	        $(this).addClass('active').siblings('.tab').removeClass('active');
	        $(this).parents('.panel').find(href).addClass('active').siblings('.tabWrapper').removeClass('active');
	    });

    });

}
