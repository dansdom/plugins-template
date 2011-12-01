// test jQuery plugin

(function($){

	$.fn.testPlugin = function(config)
	{
		// config - default settings
		var settings = {
                              'myBgColor': 'red',
                              'MyBorderColor': 'blue',
                              'boxHeight': '60px'
					 };

		// if settings have been defined then overwrite the default ones
          // comments:        true value makes the merge recursive. that is - 'deep' copy
		//				{} creates an empty object so that the second object doesn't overwrite the first object
		//				this emtpy takes object1, extends2 onto object1 and writes both to the empty object
		//				the new empty object is now stored in the var opts.
		var opts = $.extend(true, {}, settings, config);
		
		// iterate over each object that calls the plugin and do stuff
		this.each(function(){
			// do pluging stuff here
			// each box calling the plugin now has the variable name: myBox
			var myBox = $(this);

			// click toggle function
			myBox.toggle(function()
			{
				styleBox(myBox,opts);
			},
			function() 
			{
				$.fn.testPlugin.styleBox(myBox,config);
			});

			// mouseover function
			myBox.hover(function()
			{
				moveUp(myBox,opts);
			},
			function()
			{
				moveBack(myBox,opts);
			});

			// end of plugin stuff
		});

		// return jQuery object
		return this;
	};

	// plugin functions go here - example of two different ways to call a function, and also two ways of using the namespace
	// note: $.fn.testPlugin.styleBox allows for this function to be extended beyond the scope of the plugin and used elsewhere, 
	// that is why it is a superior namespace. Also: anonymous function calling I think is probably better naming practise too.



	function styleBox(box,opts)
	{
			box.css("background",opts.myBgColor);
			box.css("border","1px solid "+opts.MyBorderColor);
	}

	// note !!!! this is best namespace for provate functions in the plugin
	$.fn.testPlugin.styleBox = function(box,opts)
	{
			box.css("background","transparent");
			box.css("border","1px solid green");
			//alert(box.innerHTML);
	};

	moveUp = function(box,opts)
	{
		box.animate({"height":opts.boxHeight},1000);
	};

	moveBack = function(box)
	{
		box.animate({height:"50px"},1000);
	};

	// end of module
})(jQuery);