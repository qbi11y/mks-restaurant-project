$(document).ready(function(){
	$('.menu-section a').click(function(e) {
		e.preventDefault();
		$('.menu-section a').removeClass('selected');
		// $('.menu-section a').css({'color' : 'rgba(34, 28, 18, .75)'});
		

		// $('.menu-section a').hover( function() {
		// 	$(this).css({'color' : 'rgba(34, 28, 18, 1.0)'});
		// }, function() {
		// 	$(this).css({'color' : 'rgba(34, 28, 18, .75)'});
		// });
		$(this).addClass('selected');
		// $(this).css({'color' : 'rgba(34, 28, 18, 1.0)'});
		getMenu($(this).attr('id'));
	})

	function getMenu( menu ) {
		console.log('which menu to show ', menu);
		$.getJSON('http://mksrestaurantapi.herokuapp.com/menu-'+menu+'.json', function(data) {
		console.log(data);

		var menu_items = ''
		for (var n in data) {
			menu_items += '<div class="menu-group medium-6 columns">'+
	    					'<h4>'+data[n].section+'</h4>';
	    					for (var i in data[n].content) {
	    						if (data[n].content[i].ingredients != undefined) {
	    							menu_items += '<div class="menu-item">'+
	        									'<div class="menu-item-name">'+data[n].content[i].dish+'</div>'+
	        									'<p class="menu-item-description">'+data[n].content[i].ingredients+'</p>'+
	    										'<div class="menu-item-price">'+data[n].content[i].price+'</div>'+
	    									'</div>';
								} else {
									menu_items += '<div class="menu-item">'+
	        									'<div class="menu-item-name">'+data[n].content[i].dish+'</div>'+
	        									'<p class="menu-item-description"></p>'+
	    										'<div class="menu-item-price">'+data[n].content[i].price+'</div>'+
	    									'</div>';
								}
	    					}
							menu_items += '</div>';
		}
		$('#menu-section-content').html(menu_items);
	})
	}
	getMenu('dinner');
})