$(function(){
	$('#start_x5F_button_xA0_Image').on("click", function(){
		$(this).closest('.slide').addClass("d-none");
		$(".hanger").addClass("d-none");
	});


	$(".draggable").on('click', function(){
    var left = $(this).offset();
    var width = $(window).width();
    console.log((left.left/width)*100 + " left %");
    var top = $(this).offset();
    var height = $(window).height();
    // console.log((top.top/height)*100 + " top %");
    console.log(top.top + " top px");
  });

  var allParts = $(".draggable").length;
  for (i = 0; i< allParts; i++){
    var partsPush = $(".draggable").eq(i).attr("part-name");
    var partw = $("."+partsPush).outerWidth();
    var parth = $("."+partsPush).outerHeight();
    $("#"+partsPush).css({
      width: partw + 'px',
      height: parth + 'px',
      background: 'rgba(255,255,0,0.3)'
    });
  }

});

var completed = 0;


	// target elements with the "draggable" class
	interact('.int')
	.draggable({
    // enable inertial throwing
    inertia: false,
    // keep the element within the area of it's parent
    modifiers: [
    interact.modifiers.restrictRect({
    	restriction: 'parent',
    	endOnly: true
    })
    ],
    // enable autoScroll
    autoScroll: false,

    listeners: {
      // call this function on every dragmove event
      move: dragMoveListener,

      // call this function on every dragend event
      end (event) {
      	
      }
    }
  })

	function dragMoveListener (event) {
		var target = event.target
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

  // translate the element
  target.style.webkitTransform =
  target.style.transform =
  'translate(' + x + 'px, ' + y + 'px)'
      // target.style.left = x + 'px';
      // target.style.top = y + 'px';

  // update the posiion attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)
}

var allParts = $(".draggable").length;
for (i = 0; i< allParts; i++){
  var partsPush = $(".draggable").eq(i).attr("part-name");
  dropE(partsPush);
}

function dropE(el){
  // enable draggables to be dropped into this
  interact('#'+el).dropzone({
  // only accept elements matching this CSS selector
  accept: '.'+el,
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.9,

  // listen for drop related events:
  ondropactivate: function (event) {
    // add active dropzone feedback
    event.target.classList.add('drop-active')
    console.log("waiting for drop");
  },
  ondragenter: function (event) {
   var draggableElement = event.relatedTarget
   var dropzoneElement = event.target

    // feedback the possibility of a drop
    dropzoneElement.classList.add('drop-target')
    draggableElement.classList.add('can-drop')
    console.log("dragged in");
  },
  ondrop: function (event) {
    var draggableElement = event.relatedTarget;
    draggableElement.classList.remove('int');
    completed++;
    console.log("detected");

    if(completed == 1){
      // call function to go to the end of the slide
      $(".slide-3").removeClass('d-none');
      console.log("completed course");
    }
  }
})

}

