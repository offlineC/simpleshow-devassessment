$(function(){
	$('#start_x5F_button_xA0_Image').on("click", function(){
		$(this).closest('.slide').addClass("d-none");
		$(".hanger").addClass("d-none");
	});

	$(".left-arm").on('click', function(){
		console.log("clicked")
	});
});