$(function() {
    course.init();
    tester.init($('.hidden'));
});

var course = {
    pComplete: 0,
    startBtn: $('#start_x5F_button_xA0_Image'),
    init: function() {
        course.listening();
        $('.parts img').attr('draggable', false);
    },
    listening: function() {
        course.start();
        course.dragEl();
        course.dropEl();
        course.resize();
    },
    start: function() {
        course.startBtn.on("click", function() {
            $(this).closest('.slide').addClass("d-none");
            $(".hanger").addClass("d-none");
            $(".slide-2").removeClass('d-none');
            course.dropInit();
            course.partsInit();
        });
    },
    partsInit: function() {
        var allParts = $(".hidden").length;
        var partsPush = [];
        for (i = 0; i < allParts; i++) {
            partsPush.push($(".hidden").eq(i).attr("ref"));
            var pos = $('g[ref="' + partsPush[i] + '"]').offset();
            var left = pos.left;
            var top = pos.top;
            var offsetDiff = ($(window).width() - $('.parts').width())/2;
            $('.' + partsPush[i]).css({
                left: left-offsetDiff + 'px',
                top: top + 'px'
            });
        }
    },
    dropInit: function() {
        var allParts = $(".draggable").length;
        for (i = 0; i < allParts; i++) {
            var partsPush = $(".draggable").eq(i).attr("part-name");
            var partw = $("." + partsPush).outerWidth();
            var parth = $("." + partsPush).outerHeight();
            $("#" + partsPush).css({
                width: partw + 'px',
                height: parth + 'px',
            });
        }
    },
    dragEl: function() {
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
                    end(event) {}
                }
            })

        function dragMoveListener(event) {
            var target = event.target;
            // keep the dragged position in the data-x/data-y attributes
            var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
            var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

            // translate the element
            target.style.webkitTransform =
                target.style.transform =
                'translate(' + x + 'px, ' + y + 'px)';

            // update the posiion attributes
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
        }
    },

    dropEl: function() {
        var allParts = $(".draggable").length;
        for (i = 0; i < allParts; i++) {
            var partsPush = $(".draggable").eq(i).attr("part-name");
            dropE(partsPush);
        }

        function dropE(el) {
            // enable draggables to be dropped into this
            interact('#' + el).dropzone({
                // only accept elements matching this CSS selector
                accept: '.' + el,
                // Require a 75% element overlap for a drop to be possible
                overlap: 0.9,
                ondrop: function(event) {
                    var draggableElement = event.relatedTarget;
                    draggableElement.classList.remove('int');
                    course.pComplete++;

                    if (course.pComplete == 6) {
                        course.end()
                    }
                }
            })
        }
    },
    end: function() {
        $('.slide-3').removeClass('d-none');
        $('.feedback .btn').on('click', function() {
            $(this).closest('.feedback').addClass('d-none');
        });
    },
    resize: function() {
        $(window).on('resize', function() {
            course.dropInit();
            course.partsInit();
        });
    }

}

var tester = {
    init: function(el) {
        tester.elSize(el);
        tester.startC();
        tester.toEnd();
    },
    elSize: function(el) {
        el.on('click', function() {
            var left = $(this).offset();
            var width = $(window).width();
            // console.log((left.left / width) * 100 + " left %");
            console.log(left.left + " left px");
            var top = $(this).offset();
            var height = $(window).height();
            // console.log((top.top/height)*100 + " top %");
            console.log(top.top + " top px");
        });
    },
    startC: function() {
        course.startBtn.click();
    },
    hide: function(){
      $('body').append('<button class="hide-int" style="width:100px;height:100px;background:yellow">hide parts</button>');
      $('.hide-int').on('click', function(){
        $(".movable, .instruction").addClass('d-none');
      });
    },
    toEnd: function(){
      $('body').append('<button class="hide-int" style="width:100px;height:100px;background:#f00;color:#fff">end</button>');
      $('.hide-int').on('click', function(){
        course.end();
      });
    },
    partsInit: function() {
        var allParts = $(".hidden").length;
        var partsPush = [];
        for (i = 0; i < allParts; i++) {
            partsPush.push($(".hidden").eq(i).attr("ref"));
            var pos = $('g[ref="' + partsPush[i] + '"]').offset();
            var left = pos.left;
            var top = pos.top;
            $('.' + partsPush[i]).css({
                left: left,
                top: top
            });
        }
    },

}