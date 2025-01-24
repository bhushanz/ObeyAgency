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
      var zeroone = gsap.utils.mapRange(Xstart, Xend, 0, 1, dets.clientX);

      gsap.to(frame.children, {
        x: lerp(-20, 20, zeroone),
        duration: 0.3,
      });

      gsap.to(".circle", {
        scale: 4,
        duration: 0.5, // Optional: Smooth animation
        ease: "power1.out", // Optional: Add easing
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
        duration: 0.3,
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
    AnimationName: "anime",
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
}
cursorAnimation();
