/**
* TextFit
*
* Automatically size a textarea to fit it's content as you type.
* Requires jQuery.
*
* @version 1.2
* @category Form helper
* @author Daniel Farrelly <daniel@jellystyle.com>
* @link <https://github.com/jellybeansoup/jquery-textfit>
*/

(function( $ ){

	/**
	* The textfit function (an alias for $.textfit._init).
	* Works with a jQuery object array.
	* @var function
	*/

	$.fn.textfit = function() {
		// Loop through each object
		$(this).each(function(){
			// Set up the widget
			var textfit = {

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
				* The interval used to track changes to the textarea's content
				* @var object
				*/

				_value: null,

				/**
				* Initiate the textfit functionality on a given DOM object.
				* @param object object The jQuery DOM object.
				* @return void
				*/

				init: function( object ) {
					var widget = this;
					// Fetch the object
					widget._dom.textarea = $(object);
					// Set the minimum height
					widget._properties.min = widget._dom.textarea.height();
					widget._properties.max = widget._dom.textarea.css('max-height') !== 'none' ? widget._dom.textarea.css('max-height') : null;
					// Create a dummy element
					widget._dom.dummy = $('<div />').addClass('textfit-dummy').appendTo('body');
					// Copy styles to the dummy element
					var styles = [
						'width', 'font-family', 'font-size', 'font-weight', 'line-height', 'word-wrap', 'white-space', 'padding-top', 'padding-bottom',
						'padding-left', 'padding-right', 'border-top', 'border-bottom', 'border-left', 'border-right', '-moz-box-sizing',
						'-webkit-box-sizing', 'box-sizing'
					];
					var css = {
						position: 'absolute',
						top: '-1000000px',
						left: '-1000000px',
						width: widget._dom.textarea.width(),
					};
					for( var i in styles ) {
						var style = styles[i];
						css[style] = widget._dom.textarea.css(style);
					}
					widget._dom.dummy.css(css);
					// Resize the textarea based on the initial content
					widget._dom.textarea.css({
						'overflow': 'hidden',
						'height': widget._properties.min,
						'resize': 'none'
					});
					// Resize when the text changes
					widget._dom.textarea.on('keyup change',widget,function(e){
						e.data._fitToContent();
					});
					widget._dom.textarea.on('cut paste input',widget,function(e){
						// This interval makes the adjustment kick in as soon as the content changes
						var interval = setInterval(function(){
							// If the content hasn't changed, we do nothing.
							if( widget._content() === widget._value ) {
								return;
							}
							// Destory the interval
							clearInterval( interval );
							// Fit to the content
							e.data._fitToContent();
						},1);
					});
					// Set the starting size
					setTimeout(function(){
						var newHeight = widget._determineSize();
						if( widget._dom.textarea.height() !== newHeight ) {
							widget._dom.textarea.css({ height: newHeight });
						}
					},50);
				},

				/**
				* Size the element to fit it's content.
				* @return void
				*/

				_content: function() {
					var widget = this;
					return widget._dom.textarea.val().replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
						return '&#'+i.charCodeAt(0)+';';
					});
				},

				/**
				* Size the element to fit it's content.
				* @return void
				*/

				_fitToContent: function() {
					var widget = this;
					// If the content hasn't changed, we do nothing.
					if( widget._content() === widget._value ) {
						return;
					}
					// Store the value so we know not to do this again
					widget._value = widget._content();
					// Determine the size of the updated content
					var newHeight = widget._determineSize();
					if( widget._dom.textarea.height() !== newHeight ) {
						widget._dom.textarea.stop();
						var difference = widget._content().length - widget._properties.length;
						if( difference > -1 ) {
							widget._dom.textarea.css({ height: newHeight });
						}
						else {
							widget._dom.textarea.animate({ height: newHeight },100);
						}
					}
					// Update the length
					widget._properties.length = widget._content().length;
				},

				/**
				* Determine the height of the text.
				* @return void
				*/

				_determineSize: function() {
					var widget = this;
					// Copy the text to the dummy element
					widget._dom.dummy.html( widget._content().replace(/\n/gi,'&nbsp;<br/>') + '<br/>&nbsp;' );
					widget._dom.dummy.css({ width: widget._dom.textarea.width() });
					// Get the height and try to match the box sizing
					var new_height = widget._dom.dummy.height();
					if( widget._dom.textarea.css('box-sizing') === 'border-box' ) {
						new_height = widget._dom.dummy.outerHeight( true );
					}
					// Default to the min and max heights
					if( widget._properties.min !== null && new_height < widget._properties.min ) {
						return widget._properties.min;
					}
					else if( widget._properties.max !== null && new_height > widget._properties.max ) {
						return widget._properties.max;
					}
					else {
						return new_height;
					}
				},

				/**
				* The version number of this plugin
				* @var string
				*/

				_version: '1.2'

			};
			// Instatniate the widget
			return textfit.init( this );
		});
	};

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
	}

})();