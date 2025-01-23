

var tl = gsap.timeline();
tl.from(".line h1",{
    y:110,
    stagger:0.3,
    duration:0.75,
    delay:0.5,
    ease:"power3.out"
});
tl.from("#line-part1",{
 opacity:0,
  onStart :function(){
    let count = document.querySelector("#line-part1 h5")
    let grow =0;
   const IntervalId=setInterval(function() {
    if (grow <100){
       grow++
     count.innerHTML=grow;
    }
    else{
      clearInterval(IntervalId)
    }
   },30);
  }
});
tl.to(" .line h2",{
  AnimationName: "anime",
  opacity:1,
  ease:"power3.out"
})
tl.to("#loader",{
    opacity:0,
    duration:0.4,
    delay:4
});
tl.from("#page1",{
    y:1000,
     ease:"power3.out"

});
