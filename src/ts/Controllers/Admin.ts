module Shot {
	export module Controllers {
		/**
		 * Admin controller
		 */
		export class Admin {
			/**
			 * Index action
			 */
			index() {
			}

			/**
			 * Album action
			 */
			album() {
				var
					thumbnails: Models.Thumbnail[] = [],
					thumbnailQueue: Models.Thumbnail[] = [],
					fileTypes = [
						'image/jpg',
						'image/jpeg',
						'image/png',
						'image/gif',
						'image/bmp'
					];

				$('#files').on('change', (e) => {
					$.each(e.target.files, (i, file) => {
						var thumbnail;

						if ( file.name && $.inArray(file.type, fileTypes) !== -1 ) {
							thumbnail = new Models.Thumbnail(file, $('.thumbnail-grid'));

							thumbnails.push(thumbnail);
							thumbnailQueue.push(thumbnail);
						}
					});

					(function nextThumbnail() {
						if ( thumbnailQueue.length ) {
							thumbnailQueue.shift().preRender(() => nextThumbnail());
						}
					})();
				});
			}
		}
	}
}
