$(function(){
    $('.addButton, .event').bind('tapone', function(){
        $('.overlay').show();
    })

    $('.overlay-confirmBtn').bind('tapone', function(){
        $('.overlay').hide();        
    })
/*
	//Iscroll for the calendar wrapper
	var calScroll = new IScroll('.calendarWrapper', {
	    mouseWheel: true,
	    scrollbars: true,
	    fadeScrollbars: true,
	});

    // scroll to put the "now" in center
    calScroll.scrollTo(0, -1660 + 214, 200);*/

    $('.tabs .tab').click(function(e){
        e.preventDefault();
        var href = $(this).attr('href');
        $(this).addClass('active').siblings('.tab').removeClass('active');
        $(href).addClass('active').siblings('.tabWrapper').removeClass('active');
    });

	// var detailScroll = new IScroll('.detailWrapper', {
	//     scrollbars: false,
	// });


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
            console.log(ev);
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

    // var carousel = new Carousel("#wrapper");
    // carousel.init();

})