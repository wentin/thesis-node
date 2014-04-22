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
	var firstDay = new Date(eventList.items[0].start.dateTime);
	firstDay.setSeconds(0);
	firstDay.setMinutes(0);
	firstDay.setHours(0);
	console.log(firstDay);
	var lastDay = new Date(eventList.items[eventList.items.length-1].start.dateTime);
	lastDay.setSeconds(59);
	lastDay.setMinutes(59);
	lastDay.setHours(23);
	console.log(lastDay);
	var days = dateDiff(firstDay, lastDay, 'days');
	console.log(days);


	var calHeight = dateDiff(firstDay, lastDay, 'days') * 2400;
	console.log(calHeight);
	var oneDayText = "00:00<br>01:00<br>02:00<br>03:00<br>04:00<br>05:00<br>06:00<br>07:00<br>08:00<br>09:00<br>10:00<br>11:00<br>12:00<br>13:00<br>14:00<br>15:00<br>16:00<br>17:00<br>18:00<br>19:00<br>20:00<br>21:00<br>22:00<br>23:00<br>";
	var html = '';
	for (var i=0;i<days;i++){ 
		html += oneDayText;
	}
	$('.timeLeft, .timeRight').html(html);

	$scope.getHourMinute = function (time) {
        var d = new Date(time);
        h = (h = d.getHours()) < 10 ? '0' + h : h;
        m = (m = d.getMinutes()) < 10 ? '0' + m : m;
        var hm = h + ':' + m;
        return hm;
        //return time;
    };
    
    $scope.getTopHeight = function (event) {
    	var startTime = event.start.dateTime;
    	var endTime = event.end.dateTime;
    	var top = dateDiff(firstDay, startTime, 'minutes') / 60 * 100;
    	var height = dateDiff(startTime, endTime, 'minutes') / 60 * 100;
        return {	
        	top: top + 'px',
        	height: height + 'px'
        };
        //return time;
    };
	angular.element(document).ready(function () {
        
        //Iscroll for the calendar wrapper
		/*var calScroll = new IScroll('.calendarWrapper', {
		    mouseWheel: true,
		    scrollbars: true,
		    fadeScrollbars: true,
		});*/

		var today = new Date();
		var nowTop = dateDiff(firstDay, today, 'minutes') * 100 / 60 - 23;;
		//update div#now with current time every 60s
		setInterval(function(){
			today = new Date();
			nowTop = dateDiff(firstDay, today, 'minutes') * 100 / 60 - 23;
			$('#now').css('top', nowTop);
			var hour = today.getHours();
			var minute = today.getMinutes();
			$('#now i').html( hour + ":" + minute );
		},60);

	    // scroll to put the "now" in center
	    /*calScroll.scrollTo(0,  214 - nowTop, 200);*/
		$('.calendarWrapper').scrollTop( nowTop- 190 );

		$('.todayButton').bind('tapone', function(){
			$('.calendarWrapper').scrollTop( nowTop- 190 );			
		})

	    function Carousel(element)
	    {
	        var self = this;
	        element = $(element);

	        var container = $(">.ul", element);
	        var panes = $(">.ul>.panel", element);

	        var current_pane = 1;

	        this.init = function() {
	            setPaneDimensions();

	            // $(window).on("load resize orientationchange", function() {
	            //     setPaneDimensions();
	            //     //updateOffset();
	            // })
	        };


	        /**
	         * set the pane dimensions and scale the container
	         */
	        function setPaneDimensions() {
	            // pane_width = element.width();
	            // panes.each(function() {
	            //     $(this).width(pane_width);
	            // });
	            // container.width(pane_width*pane_count);
	        };


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

	        var hammertime = new Hammer(element[0], { drag_lock_to_axis: true });
	        hammertime.on("release dragleft dragright swipeleft swiperight", handleHammer);
	    }
	    var carousel = new Carousel("#wrapper");
	    carousel.init();

	    $('.addButton, .event').bind('tapone', function(){
	        $('.overlay').show();
	    })

	    $('.overlay-confirmBtn').bind('tapone', function(){
	        $('.overlay').hide();        
	    })
	    $('.tabs .tab').click(function(e){
	        e.preventDefault();
	        var href = $(this).attr('href');
	        $(this).addClass('active').siblings('.tab').removeClass('active');
	        $(href).addClass('active').siblings('.tabWrapper').removeClass('active');
	    });
    });

}
