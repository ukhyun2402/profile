// Vue!
const vm1 = new Vue({
    el:'#timeline',
    data:{
            timeline: null,
            Lheight: 600,
    },
    methods: {
        scroll() {
            let scrollInit = this.Lheight < document.documentElement.offsetHeight;
            console.log(scrollInit);
            if(scrollInit) {
                this.increaseLheight();
            }
            window.onscroll = () => {
                let bottomOfWindow = Math.round(Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight) + 1 > document.documentElement.offsetHeight || document.documentElement.offsetHeight < this.Lheight
                if(bottomOfWindow){
                    this.scrolledToBottom = true;
                    this.increaseLheight();
                    console.log(this.Lheight);
                }
            }
        },
        increaseLheight () {
            this.Lheight = document.documentElement.offsetHeight + 300;
            const {line} = this.$refs;
            gsap.to('#line',{duration:4, height: this.Lheight, ease:'expo'});
        },
        
    },
    mounted () {
        const {circle,circlePulse,line} = this.$refs;
        this.timeline = new gsap.timeline({
            onComplete: () => this.timeline.restart()
        });
        
        this.timeline.to(circle, 0.4, {scale: 0.8, rotation:16, ease:Back});
        this.timeline.to(circlePulse, 0.8, {scale: 0.9, opacity:1}, '-=0.6');
        this.timeline.to(circle, 1.2, {scale: 1, rotation: '-=16', ease:Elastic.easeOut.config(2.5, 0.5)});
        this.timeline.to(circlePulse, 1.1, {scale: 3, opacity:0, ease:Expo.easeOut},'-=1.2');

        // gsap.to(line,5,{yPercent:5});
        this.scroll();
    },
});  
