/* 
	jQuery Page Scroller plugin - v1.0	 
	Copyright (c) 2011 Daniel Thomson
	
	Licensed under the MIT license:
	http://www.opensource.org/licenses/mit-license.php
*/

(function($){

	$.fn.pageScroller = function(config)
	{
		// config - default settings
		var settings = {
							'nav' : '.scrollerNav ul',	// class of the scroller nav
							'addEvents' : false,		// allows events in the nav items children
							'activeClass' : 'active',	// nav active class
							'hasAnchor' : true,			// if no anchor associated with each item then set to false
							'speed' : 500,				// speed the animation goes
							'easing' : 'easeInOutBack',		// easing effect on the animation
							'startPosition' : 0			// set the start position of the scroller
					 };

		// if settings have been defined then overwrite the default ones
		// comments:	true value makes the merge recursive. that is - 'deep' copy
		//				{} creates an empty object so that the second object doesn't overwrite the first object
		//				this emtpy takes object1, extends2 onto object1 and writes both to the empty object
		//				the new empty object is now stored in the var opts.
		var opts = $.extend(true, {}, settings, config);
		
		// iterate over each object that calls the plugin and do stuff
		this.each(function(){

			var scroller = $(this);
			scroller.nav = $(opts.nav);
			scroller.length = scroller.nav.children().length;
			scroller.counter = opts.startPosition;
			scroller.css({"position":"absolute", "top":"0px", "left":"0px"});
			if (!$.ui)
			{
				opts.easing = "linear";
			}			
						
			// initialise the scroller
			$.fn.pageScroller.init(scroller, opts);
			
			// add the navigation events
			$.fn.pageScroller.addNav(scroller, opts);
			
			// end of plugin stuff
		});

		// return jQuery object
		return this;
	};

	// plugin functions go here
	$.fn.pageScroller.init = function(scroller, opts)
	{
		// add the active class to the starting item
		scroller.nav.children(":eq(" + opts.startPosition + ")").addClass(opts.activeClass);
		// get the starting position of the scroller
		
	};
	
	$.fn.pageScroller.addNav = function(scroller, opts)
	{
		// add click events for each of the nav items
		scroller.nav.children().each(function()
		{

			$(this).click(function(){
				// set the scroller counter
				scroller.counter = $(this).parent().children().index(this);
				$.fn.pageScroller.moveScoller(scroller, opts);
				return false;
			});
			
			// make sure everything below won't trigger an event if not desired
			if (opts.addEevnts === false)
			{
				$(this).children().click(function(){
					alert("returning false");
					return false;
				});
			}
			
		});
		
		// add keyboard events for the scroller
		document.onkeydown = function(e)
		{
			var keycode;
			if (window.event)
			{
				keycode = window.event.keyCode;
			}
			else if (e)
			{
				keycode = e.which;
			}
			
			if (keycode == 39 || keycode == 32)
			{
				// show the next box
				scroller.counter += 1;
				if (scroller.counter == scroller.length)
				{
					scroller.counter = 0;
				}
				$.fn.pageScroller.moveScoller(scroller, opts);
			}
			else if (keycode == 37)
			{
				// show the previous box
				scroller.counter -= 1;
				if (scroller.counter < 0)
				{
					scroller.counter = scroller.length - 1;
				}
				$.fn.pageScroller.moveScoller(scroller, opts);
			}
			
		};
	};

	$.fn.pageScroller.moveScoller = function(scroller, opts)
	{
		var currentNavItem = scroller.nav.children(":eq(" + scroller.counter + ")"),
			currentHref,
			currentItem,
			itemOffset,
			parentOffset,
			totalOffset;
		
		currentNavItem.siblings().removeClass(opts.activeClass);
		currentNavItem.addClass(opts.activeClass);
		// find my href value
		if (currentNavItem.attr("href"))
		{
			currentHref = currentNavItem.attr("href");
		}
		else
		{
			currentHref = currentNavItem.find("a").attr("href");
		}
		//console.log(currentHref);
		currentItem = $(currentHref);
		
		// find the offset of the div
		// 1. get the div offset
		// 2. get the parent offset and then combine them
		itemOffset = currentItem.offset().top;
		parentOffset = scroller.offset().top;
		totalOffset = itemOffset - parentOffset;
		
		//itemOffset = offset.top;
		//console.log("item: " + itemOffset + ", parent: " + parentOffset + ", total: " + totalOffset);
		scroller.animate({"top":-totalOffset+"px"}, 1000, opts.easing);
	};

	// end of module
})(jQuery);