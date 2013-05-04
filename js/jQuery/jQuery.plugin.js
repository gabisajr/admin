//jQuery plugin 
(function($){
	$.fn.mytest = function(opts){
		var setting = $.extend({
			title : "hello world"

		},opts||{});

		alert($(this));
	}


})(jQuery)