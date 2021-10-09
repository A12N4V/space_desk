// Show Sub-competence
const visualise=[]
  $('.close-sub-modal').on('click', function () {
    $(this).parent().removeClass('sub-competence-modal');
    $('.carousel-control').css('display', 'block');
  });

  $('.technical svg a').on('click', function () {

    var $subText = $(this).attr('data-sub-competence'),
      $subTextNext = $subText,
      $sub = $($subText).siblings('.sub-competence');

    // Open beautiful light modal
    
      // Neon effect to sub-arc

      TweenMax.fromTo($sub.find('feGaussianBlur'), 0.05, {
        attr: {
          stdDeviation: 5
        }
      }, {
        attr: {
          stdDeviation: 6
        },
        repeat: -1,
        /* Aka infinite amount of repeats */
        yoyo: true,
        /* Make it go back and forth */
      });

      // Prevent user to stop the ongoing animation

      if ($sub.hasClass('inactive')) {
          $sub.addClass("open");
          $(this).addClass('active');
          subOpenClose($sub, $subText).resume();
          visualise.push($(this).attr('data-sub-competence'))
        }

  function subOpenClose($sub, $subText, $subTextNext) {
    var tl = new TimelineLite({
      onReverseComplete: function () {
        if (typeof ($subTextNext) !== 'undefined') {
          subOpenClose($sub, $subTextNext).resume();
        } else {
          tl.set($sub, {
            className: '+=inactive'
          })
        }
      },
      onComplete: function () {
        tl.set($sub, {
          className: '+=inactive'
        })
      },
      pause: true
    });

    tl.set($sub, {
      className: '-=inactive'
    })

    tl.fromTo($sub, .3, {
      opacity: 0
    }, {
      opacity: 1
    })

    tl.add("open");

    tl.fromTo($sub.children('.sub-background'), .5, {
        scaleX: 0.1,
        transformOrigin: "50% 50%",
        ease: Expo.easeOut
      }, {
        scaleX: 1.0,
        ease: Expo.easeOut
      }, "open")
      .fromTo($sub.children('.sub-arc.left'), .5, {
        x: 290,
        transformOrigin: "50% 50%",
        ease: Expo.easeOut
      }, {
        x: 0,
        transformOrigin: "50% 50%",
        ease: Expo.easeOut
      }, "open")
      .fromTo($sub.children('.sub-arc.right'), .5, {
        x: -290,
        transformOrigin: "50% 50%",
        ease: Expo.easeOut
      }, {
        x: 0,
        ease: Expo.easeOut
      }, "open");

    tl.fromTo($sub.children('.sub-decoration'), .5, {
      opacity: 0,
    }, {
      opacity: 1
    });

    tl.fromTo($subText, .5, {
      opacity: 0,
    }, {
      opacity: 1
    });

    tl.set($sub, {
      className: '-=inactive'
    })

    return tl;
  }
  setInterval(() =>{
    console.log(visualise)
    if (visualise[visualise.length-1]==="#coed") {
      location.assign('./visualisation/coed.html')
    } else if (visualise[visualise.length-1]==="#dendro") {
      location.assign('./visualisation/dendro.html')
    } else if (visualise[visualise.length-1]==="#metaao") {
      location.assign('./visualisation/metaao.html')
    } 
  },5000)
});