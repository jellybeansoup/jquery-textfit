#jQuery TextFit

TextFit is a jQuery plugin that automatically resizes HTML `textarea` elements to fit their content.

##Requirements

* [jQuery](http://jquery.com)
* [ZURB's Text Change Event Plugin](http://www.zurb.com/playground/jquery-text-change-custom-event)

**Please note:** TextFit will work just fine without the text change event, however the content will only fit when jQuery's built in 'change' event is triggered.

##Installation

Copy the TextFit file (either the uncompressed or the minified one) to your resources directory and then simply link to the file in your HTML document.

```html
<script src="jquery-textfit.js" type="text/javascript"></script>
```

To get up and running quickly, you can set TextFit to automatically match all `textarea` elements within the document by adding "?auto" to the end of the `script` element's `src` attribute.

```html
<script src="jquery-textfit.js?auto" type="text/javascript"></script>
```

##Using TextFit

To run TextFit, simply run the function on any `textarea` elements matched with jQuery, like so:

```javascript
$('textarea').textfit();
```

You can limit the height of a textarea using CSS, simply by setting the `max-height` rule.

```css
textarea {
    max-height: 300px;
}
```

##Released under the BSD License

Copyright © 2012-2013 Daniel Farrelly

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

*	Redistributions of source code must retain the above copyright notice, this list
	of conditions and the following disclaimer.
*	Redistributions in binary form must reproduce the above copyright notice, this
	list of conditions and the following disclaimer in the documentation and/or
	other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.