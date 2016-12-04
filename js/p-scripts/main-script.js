var mainScript = function(){
	var $gallery = $(".gallery"),
		vm = {
			title: ko.observable("Gallerie"),
			images: ko.observableArray([]),
			close: function(){
				vm.images([]);
				$gallery.hide();
			}
		};
	
	
	window["showGallery"] = function(galleryId){
		
		return $.ajax({
			url: "gallery-loader.php",
			data: "gallery="+galleryId,
			method: "GET",
			dataType: "json"
		}).then(function(response){
			
			if(response && response.images && response.images.length>0){
				
				vm.images(response.images);
				
				$gallery.show();
			}
		});
	};
	
	ko.applyBindings(vm, $gallery[0]);
};