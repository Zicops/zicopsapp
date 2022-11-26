// var lastScrollTop = 0;
// // https://stackoverflow.com/questions/31223341/detecting-scroll-direction
// function isScrollingDown() {
//   var st = window.pageYOffset || document.documentElement.scrollTop;
//   const res = st > lastScrollTop;
//   lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
//   return res;
// }
let btns = document.querySelectorAll('.mouse-cursor-gradient-tracking-btn');

btns.forEach((btn) => {
  btn.style.setProperty('--x', '0px');
  btn.style.setProperty('--y', '0px');
  btn.addEventListener('mousemove', (e) => {
    let rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    btn.style.setProperty('--x', x + 'px');
    btn.style.setProperty('--y', y + 'px');
  });
});


const snapSections = document.querySelectorAll('.snap-section');

let observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        window.scrollTo(0, document.body.scrollHeight);
      }
    });
  },
  {
    threshold: 0.1
  }
);

snapSections.forEach((section) => {
  observer.observe(section);
});

window.onscroll = function () {
  if (document.body.scrollTop > 1 || document.documentElement.scrollTop > 1) {
    document.querySelector('.logo').style.padding = '20px 0';
    const OFFSET_PIXEL = 25;
    if (document.body.offsetHeight - (window.innerHeight + window.scrollY) <= OFFSET_PIXEL) {
      // you're at the bottom of the page
      document.getElementById('navbar').style.backgroundColor = 'transparent';
    } else {
      document.getElementById('navbar').style.backgroundColor = '#0d0f11';
    }
  } else {
    document.querySelector('.logo').style.padding = '30px 0';
    document.getElementById('navbar').style.backgroundColor = 'transparent';
  }
};

function reveal() {
  var reveals = document.querySelectorAll('.animate');
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add('animate__animated');
      reveals[i].classList.add('animate__fadeInUp');
      reveals[i].classList.add('show');
    } else {
      // reveals[i].classList.remove('animate__animated');
      // reveals[i].classList.remove('animate__fadeInUp');
    }
  }
}

window.addEventListener('scroll', reveal);
reveal();

