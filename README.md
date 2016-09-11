
# `<chrome-image>`

A `chrome-image` behaves exactly the same as `iron-image` but it handles images in CSP environment.
It has additional attribute `blob` that can be used to set an image data.
If `src` attribute change then ajax request will be made to download the image and it will be placed
in local filesystem so it can be displayed in Chrome apps.

This element can be also used in any other environment.

## Permissions
You need to declare `url` pattern for the images you'd like to display.
For example:

    ...
       "permissions": [
          "<all_urls>"
       ],
    ...

## Example
### Regular image
```css
.image-style {
  width:400px;
  height:400px;
  background-color: lightgray;
}
```
```html
<chrome-image
  class="image-style"
  sizing="cover"
  preload
  src="http://lorempixel.com/600/400"></chrome-image>
```
### Blob data
```
<chrome-image
  class="image-style"
  sizing="cover"
  preload
  blob="[[imageBlob]]"></chrome-image>
```



### Events
| Name | Description | Params |
| --- | --- | --- |
| chrome-image-error | Fired when ther was an error loading an image. | __none__ |
