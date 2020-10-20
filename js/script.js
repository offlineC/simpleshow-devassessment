$(function(){
	$('#start_x5F_button_xA0_Image').on("click", function(){
		$(this).closest('.slide').addClass("d-none");
		$(".hanger").addClass("d-none");
	});

	$(".left-arm").on('click', function(){
		console.log("clicked")
	});
});


	// target elements with the "draggable" class
	interact('.part')
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

  // update the posiion attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)
}

// enable draggables to be dropped into this
interact('.droparea').dropzone({
  // only accept elements matching this CSS selector
  // accept: '#yes-drop',
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.75,

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
    draggableElement.textContent = 'Dragged in'
    console.log("dragged in");
},
ondragleave: function (event) {
    // remove the drop feedback style
    event.target.classList.remove('drop-target')
    event.relatedTarget.classList.remove('can-drop')
    event.relatedTarget.textContent = 'Dragged out'
},
ondrop: function (event) {
	event.relatedTarget.textContent = 'Dropped'
},
ondropdeactivate: function (event) {
    // remove active dropzone feedback
    event.target.classList.remove('drop-active')
    event.target.classList.remove('drop-target')
}
})

