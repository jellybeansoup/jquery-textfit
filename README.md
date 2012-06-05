#jQuery TextFit

##Requirements

TextFit requires the jQuery library and works best if you implement [ZURB's textchange plugin for jQuery](http://www.zurb.com/playground/jquery-text-change-custom-event).

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

##Released under the MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.