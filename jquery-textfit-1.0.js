/**
* TextFit
*
* Automatically size a textarea to fit it's content as you type.
* Requires jQuery, and works best with ZURB's textchange plugin (http://www.zurb.com/playground/jquery-text-change-custom-event)
*
* @version 1.0 
* @category Form helper
* @author Daniel Farrelly <daniel@jellystyle.com>
* @link <https://github.com/jellybeansoup/>
*/

(function( $ ){

	/**
	* The textfit namespace
	* @var object
	*/

	$.textfit = {

		/**
		* Initiate the textfit functionality on a given DOM object.
		* @param object object The jQuery DOM object.
		* @return void
		*/
	
		init: function( object ) {
			var widget = this;
			// Fetch the object
			widget._dom.textarea = object;
			// Set the minimum height
			widget._properties.min = widget._dom.textarea.height();
			widget._properties.max = widget._dom.textarea.css('max-height') != 'none' ? widget._dom.textarea.css('max-height') : null;
			// Create a dummy element
			widget._dom.dummy = $('<div />').css({
				'position': 'absolute',
				'top': '-1000000px',
				'left': '-1000000px',
				'width': widget._dom.textarea.width(),
				'font-family': widget._dom.textarea.css('font-family'),
				'font-size': widget._dom.textarea.css('font-size'),
				'line-height': widget._dom.textarea.css('line-height'),
				'padding-top': widget._dom.textarea.css('padding-top'),
				'padding-bottom': widget._dom.textarea.css('padding-bottom'),
				'padding-left': widget._dom.textarea.css('padding-left'),
				'padding-right': widget._dom.textarea.css('padding-right')
			}).appendTo('body');
			// Resize when the text changes
			widget._dom.textarea.css({
				'overflow': 'hidden',
				'height': widget._properties.min
			});
			// Resize when the text changes
			widget._dom.textarea.bind('textchange change',widget,function(e){
				e.data._fitToContent();
			}).change();
			// Set the starting size
			var newHeight = this._determineSize();
			if( widget._dom.textarea.height() != newHeight ) {
				widget._dom.textarea.css({ height: newHeight });
			}
		},

		/**
		* The DOM elements that make up the widget
		* @var object
		*/
	
		_dom: {
			textarea: null,
			dummy: null
		},
	
		/**
		* The properties for this instance of the textfit widget
		* @var object
		*/
	
		_properties: {
			length: 0,
			min: null,
			max: null
		},
		
		/**
		* Size the element to fit it's content.
		* @return void
		*/
	
		_fitToContent: function() {
			var widget = this;
			var newHeight = widget._determineSize();
			if( widget._dom.textarea.height() != newHeight ) {
				widget._dom.textarea.stop();
				var difference = widget._dom.textarea.val().length - widget._properties.length;
				if( difference < -1 || difference > 1 )
					widget._dom.textarea.css({ height: newHeight });
				else
					widget._dom.textarea.animate({ height: newHeight },100);
			}
			// Update the length
			widget._properties.length = widget._dom.textarea.val().length;
		},

		/**
		* Determine the height of the text.
		* @return void
		*/
	
		_determineSize: function() {
			var widget = this;
			// Copy the text to the dummy element
			widget._dom.dummy.html( widget._dom.textarea.val().replace(/\n/gi,'&nbsp;<br/>') + '<br/>&nbsp;' );
			// Default to the min and max heights
			if( widget._properties.min != null && widget._dom.dummy.height() < widget._properties.min )
				return widget._properties.min;
			else if( widget._properties.max != null && widget._dom.dummy.height() > widget._properties.max )
				return widget._properties.max;
			else
				return widget._dom.dummy.height();
		},
	
		/**
		* The version number of this plugin
		* @var string
		*/
	
		_version: '1.0'

	};

	/**
	* The textfit function (an alias for $.textfit._init).
	* Works with a jQuery object array.
	* @var function
	*/

	$.fn.textfit = function() {
		$(this).each(function(){
			$.textfit.init( $(this) );
		});
	}

})( jQuery );

/**
* Apply automatically to all textarea elements on load.
*/

(function() {
	
	var $ = jQuery, s = document.getElementsByTagName('script');
	if (s[s.length - 1].src.indexOf('?auto') > -1 ) {
		$().ready(function () {
			$('textarea').textfit();
		});
	};

})();