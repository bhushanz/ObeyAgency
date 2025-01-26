function locomotiveAnimation(){
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
  
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("main"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);
  
  // tell ScrollTrigger to use these proxy methods for the "main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("main").style.transform ? "transform" : "fixed"
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();


}
locomotiveAnimation()



let circle = document.querySelector(".circle");
let frames = document.querySelectorAll(".frame");
let menu=document.querySelector(".nav-part");
function zoomeffect() {
  frames.forEach(function (frame) {
    frame.addEventListener("mousemove", function (dets) {
      const lerp = (x, y, a) => x * (1 - a) + y * a;
      var dims = frame.getBoundingClientRect();
      var Xstart = dims.x;
      var Xend = dims.x + dims.width;
      var  Ystart=dims.y;
      var Yend=dims.y+dims.height;

      var zerooneX = gsap.utils.mapRange(Xstart, Xend, 0, 1, dets.clientX);
      var zerooneY=gsap.utils.mapRange(Ystart,Yend,0,1,dets.clientY);

      gsap.to(frame.children, {
        x: lerp(-20, 20, zerooneX),
        y:lerp(-20, 20, zerooneY),
        duration: 0.3,
      });

      gsap.to(".circle", {
        scale: 4,
        duration: 0.5, // Optional: Smooth animation
        ease: "power1.out", // Optional: Add easing
      });

      gsap.to(frame.children, {
        fontSize: "2vw", 
        duration:.4,
        ease:"power3.out"
      });
      
    });
  });

  frames.forEach(function (frame) {
    frame.addEventListener("mouseleave", function () {
      gsap.to(".circle", {
        scale: 1,
        duration: 0.5, // Optional: Smooth animation
        ease: "power1.out", // Optional: Add easing
      });

      gsap.to(frame.children, {
        x: 0,
        y:0,
        duration: 0.3,
      });
      gsap.to(frame.children, {
        fontSize: "1vw", 
      });
    });
  });

  var navpart=document.querySelector(".nav-part");
menu.addEventListener("mousemove", function(dets){
  const lerp = (x, y, a) => x * (1 - a) + y * a;
  var dims = navpart.getBoundingClientRect();
  var Xstart = dims.x;
  var Xend = dims.x + dims.width;
  var zeroone = gsap.utils.mapRange(Xstart, Xend, 0, 1, dets.clientX);

  gsap.to(".circle", {
    scale: 4,
    duration: 0.5, // Optional: Smooth animation
    ease: "power1.out", // Optional: Add easing
  });
  gsap.to(".nav-part i",{
    x:lerp(-20,20,zeroone),
    duration:.3
  })
})

menu.addEventListener("mouseleave", function(dets){
  gsap.to(".circle", {
    scale: 1,
    duration: 0.5, // Optional: Smooth animation
    ease: "power1.out", // Optional: Add easing
  });
  gsap.to(".nav-part i",{
    x:0,
    duration:.3
  })
})
}
zoomeffect();

function loaderAnimation() {
  var tl = gsap.timeline();
  tl.from(".line h1", {
    y: 110,
    stagger: 0.3,
    duration: 0.75,
    delay: 0.5,
    ease: "power3.out",
  });
  tl.from("#line-part1", {
    opacity: 0,
    onStart: function () {
      let count = document.querySelector("#line-part1 h5");
      let grow = 0;
      const IntervalId = setInterval(function () {
        if (grow < 100) {
          grow++;
          count.innerHTML = grow;
        } else {
          clearInterval(IntervalId);
        }
      }, 30);
    },
  });
  tl.to(" .line h2", {
    AnimationName: "loaderanime",
    opacity: 1,
    ease: "power3.out",
  });

  tl.to("#loader", {
    opacity: 0,
    duration: 0.4,
    delay: 4,
    onComplete: () => {
      // Callback after the animation completes
      document.getElementById("loader").style.display = "none"; // Hide the loader
      document.body.classList.remove("no-scroll");
      // Re-enable scrolling
    },
  });
  tl.from("#page1", {
    y: 1000,
    ease: "power3.out",
  });
  tl.from(" #page1 .navbar",{
    opacity:0,
    duration:.5
  })
  tl.from(".hero h1,.hero h2",{
    y:120,
    duration:.5
  })
}
loaderAnimation();
document.body.classList.add("no-scroll");

function cursorAnimation() {
  window.addEventListener("mousemove", function (dets) {
    gsap.from(".circle", {
      x: dets.clientX,
      y: dets.clientY,
      duration: 0.3,
      ease: "expo",
    });
  });

  let videoContainer=document.querySelector(".videoContainer");
  let playBtn=document.querySelector(".videoPlay")
  
  videoContainer.addEventListener("mouseenter", function () {
    videoContainer.addEventListener("mousemove", function(dets){
      gsap.to(".circle",{
        opacity:0
      })
    gsap.to(playBtn,{
      left: dets.x - 520,
      y: dets.y - 200,
  
    })
    })

    var flag = 0
    var video = document.querySelector("video")
    var img =document.querySelector(".videoContainer img")
    videoContainer.addEventListener("click", function () {
      if (flag == 0) {
        img.style.opacity =0;
        video.play()
        video.style.opacity = 1
        playBtn.innerHTML= `<i class="fa-solid fa-pause"></i>`
        gsap.to(playBtn, {
          scale: 0.5
        })
        flag = 1
      } else {
        video.pause()
        video.style.opacity = 0
        img.style.opacity =1;
      playBtn.innerHTML= `<i class="fa-solid fa-play"></i>`
        gsap.to(playBtn, {
          scale: 1
        })
        flag = 0
      }
    })
  
  })


  videoContainer.addEventListener("mouseleave", function (dets) {
    gsap.to(".circle",{
      opacity:1
    })
    gsap.to(playBtn,{
      left: "70%",
      top:"-10%"
  
    })
 
  })


}
cursorAnimation();



