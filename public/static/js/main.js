window.onscroll = function () {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.getElementById('navbar').style.height = '50px';
    document.getElementById('navbar').style.backgroundColor = '#131518';
  } else {
    document.getElementById('navbar').style.height = '100px';
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

let direction = 'up';
let prevYPosition = 0;

// const setScrollDirection = () => {
//   if (scrollRoot.scrollTop > prevYPosition) {
//     direction = 'down';
//   } else {
//     direction = 'up';
//   }

//   prevYPosition = scrollRoot.scrollTop;
// };

// $(document).ready(function () {});
const snapSections = document.querySelectorAll('.snap-section');

let observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // setScrollDirection();
        console.log(entry, entry.target, direction, prevYPosition);
        entry.target.style.color = 'red';
        entry.target.scrollIntoView({behavior: 'smooth'});
        // entry.target.classList.add('stick-top');
        // document.getElementById('navbar').style.height = '100px';
        // document.getElementById('navbar').style.backgroundColor = 'transparent';
        // alert(entry.target.classList);
        // observer.unobserve(snapSections);
      } else {
        entry.target.style.color = 'blue';
        // entry.target.classList.remove('stick-top');
      }
    });
  },
  {
    // root: null,
    // rootMargin: '0px 0px',
    threshold: 0.6
  }
);

snapSections.forEach((section) => {
  observer.observe(section);
});

// const targets = document.querySelectorAll('[data-observer]');
// const images = document.querySelectorAll('[data-img]');

// const options = {
//   rootMargin: '0px',
//   threshold: 1.0
// };

// const addClass = (el) => {
//   if (!el.classList.contains('is-visible')) {
//     el.classList.add('is-visible');
//   }
// };

// const removeClass = (el) => {
//   if (el.classList.contains('is-visible')) {
//     el.classList.remove('is-visible');
//   }
// };

// const doThings = (entries, observer) => {
//   entries.forEach((entry) => {
//     if (entry.isIntersecting) {
//       addClass(entry.target);
//     } else {
//       removeClass(entry.target);
//     }
//   });
// };

// const observer = new IntersectionObserver(doThings, options);

// const observer2 = new IntersectionObserver(doThings, { ...options, threshold: 0.4 });

// targets.forEach((target) => {
//   observer.observe(target);
// });

// images.forEach((target) => {
//   observer2.observe(target);
// });
