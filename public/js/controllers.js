function dateDiff(date1,date2,interval) {
    var second=1000, minute=second*60, hour=minute*60, day=hour*24, week=day*7;
    date1 = new Date(date1);
    date2 = new Date(date2);
    var timediff = date2 - date1;
    if (isNaN(timediff)) return NaN;
    switch (interval) {
        case "years": return date2.getFullYear() - date1.getFullYear();
        case "months": return (
            ( date2.getFullYear() * 12 + date2.getMonth() )
            -
            ( date1.getFullYear() * 12 + date1.getMonth() )
        );
        case "weeks"  : return Math.floor(timediff / week);
        case "days"   : return Math.floor(timediff / day); 
        case "hours"  : return Math.floor(timediff / hour); 
        case "minutes": return Math.floor(timediff / minute);
        case "seconds": return Math.floor(timediff / second);
        default: return undefined;
    }
}



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
        var HHmm =  moment().format('HH:mm');
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

	angular.element(document).ready(function () {
        
        //Iscroll for the calendar wrapper
		/*var calScroll = new IScroll('.calendarWrapper', {
		    mouseWheel: true,
		    scrollbars: true,
		    fadeScrollbars: true,
		});*/

		var panelSwitch = true;
		
		var now = moment();
		var nowTop = now.diff(firstDay, 'minutes') / 60 * 100 - 22;
		//update div#now with current time every 60s
		setInterval(function(){
			var now = moment();
			var nowTop = now.diff(firstDay, 'minutes') / 60 * 100 - 22;
			$('#now').css('top', nowTop);
			$('#now i').html( now.format('HH:mm') );
		},60);

	    // scroll to put the "now" in center
	    /*calScroll.scrollTo(0,  214 - nowTop, 200);*/
		$('.calendarWrapper').scrollTop( nowTop- 190 );

		$('.todayButton').bind('tapone', function(){
			$('.calendarWrapper').scrollTop( nowTop- 190 );			
		})

		$('.inviteButton').bind('tapone', function(){
			$(this).toggleClass('on').toggleClass('off');		
		})

	    function setClock(h, m) {
	    	if ( h >= 12) {
	    		h -= 12;
	    	}
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
	            	$('.left.event').addClass('side');
	            } else if (index == 1){
	            	offset = -276;
	            	$('.event').removeClass('side');
	            } else if (index == 2){
	            	offset = -552;
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

	        var hammertime = new Hammer(element[0], { drag_lock_to_axis: true });
	        hammertime.on("release dragleft dragright swipeleft swiperight", handleHammer);
	    }
	    var carousel = new Carousel("#wrapper");

	    $('.addButton').bind('tapone', function(){
	        $('.module.add').addClass('on');
	    })

	    $('.taskTime').bind('tapone', function(){
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

	    $('.ampmswitch').bind('tapone', function(){
	    	if($(this).html() == 'am') {
	    		$(this).html('pm');
	    	}else{
	    		$(this).html('am');
	    	}
	    	$('.hourWrapper').toggleClass('active');
	    })

	    $('.taskLength').bind('tapone', function(){
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


		var currentHeight, currentTaskHour, currentTaskMin, currentTaskTime;
	    Hammer($('.editLength').get(0)).on("drag dragstart dragend", function (event) {
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
		             if(clockMin >= 60) {
		             	clockMin -= 60;
		             	clockHour += 1;
		             }
	        		 setClock(clockHour, clockMin);


		             var clockTime = currentTaskTime.clone().add({hours:durationHour,minutes:durationMin})
		             
	        		 clockMin = Math.floor(clockMin);
	        		 clockMin = (clockMin > 9)?clockMin:'0'+clockMin;
	        		 clockHour = (clockHour > 9)?clockHour:'0'+clockHour;

	        		 durationMin = Math.floor(durationMin);
	        		 durationMin = (durationMin > 9)?durationMin:'0'+durationMin;
	        		 durationHour = (durationHour > 9)?durationHour:'0'+durationHour;
	        		
		            // set the length text, endTime text when dragging
	        		var endTimeEl = document.querySelector('.endTime');
	        		var lengthEl  = document.querySelector('.length');
	        		if(!(clockMin % 5)){
	        			endTimeEl = replaceHtml(endTimeEl, '<span>'+clockTime.format('HH')+'</span>'+':'+'<span>'+clockMin+'</span>');
	        			lengthEl  = replaceHtml(lengthEl, '<span>'+durationHour+'</span> h <span>'+durationMin+'</span> m');
	        		 }
		             break;
		        case 'dragstart':
		             currentHeight = $('.lengthBar').height();
		             currentTaskHour = $('.taskTime span:eq(0)').html();
		             currentTaskMin = $('.taskTime span:eq(1)').html();
		             currentTaskTime = moment().hours(currentTaskHour).minutes(currentTaskMin);

		             panelSwitch = false;
		             break;
		        case 'dragend':
		             panelSwitch = true;
		             break;
		    }     
		});
		
	    $('.module.editLength .ok').bind('tapone', function(){
	        var duration = $('.module.on .length').html();
	        $('.module.on .taskLength').html(duration);
	    })

	    $('.module .ok, .module .cancel').bind('tapone', function(){
	        $(this).parents('.module').removeClass('on');
	    })

	    $('.hourWrapper div').bind('tapone', function(){
	        $('.hourWrapper div').removeClass('select');
	        $(this).addClass('select');
	    })

	    $('.minWrapper div').bind('tapone', function(){
	        $(this).siblings('div').removeClass('select');
	        $(this).addClass('select');
	    })

	    $('.module.editTime .ok').bind('tapone', function(){
	        var hour = $('.hourWrapper div.select').text();
	        var min = $('.minWrapper div.select').text();
	        $('.module.on .taskTime').html('<span>'+hour+'</span>'+':'+'<span>'+min+'</span>');
	    })

	    $('.tabs .tab').click(function(e){
	        e.preventDefault();
	        var href = $(this).attr('href');
	        $(this).addClass('active').siblings('.tab').removeClass('active');
	        $(href).addClass('active').siblings('.tabWrapper').removeClass('active');
	    });

    });

}
