Polymer({
  is: 'chrome-image',

  /**
   * Fired when ther was an error loading an image.
   *
   * @event chrome-image-error
   * @property {Object} detail An error object returned by `<iron-ajax>`
   */
  properties: {
    // Image's alt attribute
    alt: String,
    /**
     * When true, the image is prevented from loading and any placeholder is shown.
     * This may be useful when a binding to the src property is known to be invalid,
     * to prevent 404 requests.
     */
    preventLoad: Boolean,
    /**
     * When a sizing option is used (cover or contain), this determines how the image is
     * aligned within the element bounds.
     */
    position: String,
    /**
     * Sets a sizing option for the image.  Valid values are `contain` (full
     * aspect ratio of the image is contained within the element and
     * letterboxed) or `cover` (image is cropped in order to fully cover the
     * bounds of the element), or `null` (default: image takes natural size).
     */
    sizing: String,
    /**
     * When `true`, any change to the `src` property will cause the `placeholder`
     * image to be shown until the new image has loaded.
     */
    preload: Boolean,
    /**
     * This image will be used as a background/placeholder until the src image has
     * loaded.  Use of a data-URI for placeholder is encouraged for instant rendering.
     */
    placeholder: String,
    /**
     * When `preload` is true, setting `fade` to true will cause the image to
     * fade into place.
     */
    fade: Boolean,
    // Read-only value that is true when the image is loaded.
    loaded: {
      type: Boolean,
      notify: true
    },
    /**
     * Read-only value that tracks the loading state of the image when the `preload`
     * option is used.
     */
    loading: {
      type: Boolean,
      notify: true
    },
    // Read-only value that indicates that the last set `src` failed to load.
    error: {
      type: Boolean,
      notify: true
    },
    /**
     * Can be used to set the width of image (e.g. via binding); size may also be
     * set via CSS.
     */
    width: Number,
    /**
     * Can be used to set the height of image (e.g. via binding); size may also be
     * set via CSS.
     */
    height: Number,
    /**
     * If set it will be displayed as an image.
     */
    blob: {
      type: Blob,
      observer: '_blobChanged'
    },
    /**
     * The URL of an image.
     */
    src: {
      type: String,
      observer: '_srcChanged'
    },
    /**
     * Local data URL to display an image.
     */
    localSrc: {
      type: String,
      readOnly: true
    }
  },

  detached: function() {
    this._clean();
  },

  _blobChanged: function() {
    this.set('src', undefined);
    if (this.blob) {
      this._resize();
      this._setLocalSrc(window.URL.createObjectURL(this.blob));
    }
  },

  _imageResponse: function(e) {
    this.set('blob', e.detail.response);
  },

  _imageError: function(e) {
    this.set('blob', undefined);
    this.set('error', true);
    // console.error('chrome-image-error', e);
    this.fire('error', e);
  },

  _srcChanged: function() {
    this._clean();
    this._setLocalSrc('');
  },

  _clean: function() {
    if (this.localSrc) {
      window.URL.revokeObjectURL(this.localSrc);
    }
    this.set('error', false);
  },

  _resize: function() {
    var rect = this.getClientRects();
    if (rect && rect[0] && rect[0].width) {
      this.set('width', rect[0].width);
      this.set('height', rect[0].height);
    }
  }
});
