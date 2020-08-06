"use strict";

// Vue!
var vm1 = new Vue({
  el: '#timeline',
  data: {
    timeline: null,
    Lheight: 600
  },
  methods: {
    scroll: function scroll() {
      var _this = this;

      var scrollInit = this.Lheight < document.documentElement.offsetHeight;
      console.log(scrollInit);

      if (scrollInit) {
        this.increaseLheight();
      }

      window.onscroll = function () {
        var bottomOfWindow = Math.round(Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight) + 1 > document.documentElement.offsetHeight || document.documentElement.offsetHeight < _this.Lheight;

        if (bottomOfWindow) {
          _this.scrolledToBottom = true;

          _this.increaseLheight();

          console.log(_this.Lheight);
        }
      };
    },
    increaseLheight: function increaseLheight() {
      this.Lheight = document.documentElement.offsetHeight + 300;
      var line = this.$refs.line;
      gsap.to('#line', {
        duration: 4,
        height: this.Lheight,
        ease: 'expo'
      });
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    var _this$$refs = this.$refs,
        circle = _this$$refs.circle,
        circlePulse = _this$$refs.circlePulse,
        line = _this$$refs.line;
    this.timeline = new gsap.timeline({
      onComplete: function onComplete() {
        return _this2.timeline.restart();
      }
    });
    this.timeline.to(circle, 0.4, {
      scale: 0.8,
      rotation: 16,
      ease: Back
    });
    this.timeline.to(circlePulse, 0.8, {
      scale: 0.9,
      opacity: 1
    }, '-=0.6');
    this.timeline.to(circle, 1.2, {
      scale: 1,
      rotation: '-=16',
      ease: Elastic.easeOut.config(2.5, 0.5)
    });
    this.timeline.to(circlePulse, 1.1, {
      scale: 3,
      opacity: 0,
      ease: Expo.easeOut
    }, '-=1.2'); // gsap.to(line,5,{yPercent:5});

    this.scroll();
  }
});