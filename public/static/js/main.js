// var lastScrollTop = 0;
// // https://stackoverflow.com/questions/31223341/detecting-scroll-direction
// function isScrollingDown() {
//   var st = window.pageYOffset || document.documentElement.scrollTop;
//   const res = st > lastScrollTop;
//   lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
//   return res;
// }

// Button Gradient Start
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
// Button Gradient End

// Snap Section Start
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
    threshold: 0.2
  }
);
snapSections.forEach((section) => {
  observer.observe(section);
});
// Snap Section End

// window.onload = function () {
//   document.getElementById('navbar').style.backgroundColor = 'transparent';
// }
window.onscroll = function () {
  if (screen.width < 400) return;

  if (document.body.scrollTop > 1 || document.documentElement.scrollTop > 1) {
    document.getElementById('navbar').style.height = '60px';
    const OFFSET_PIXEL = 25;
    if (document.body.offsetHeight - (window.innerHeight + window.scrollY) <= OFFSET_PIXEL) {
      // you're at the bottom of the page
      // document.getElementById('navbar').style.backgroundColor = 'transparent';
    } else {
      document.getElementById('navbar').style.backgroundColor = '#131518';
    }
  } else {
    document.getElementById('navbar').style.height = '90px';
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

// Calendly.initInlineWidget({
//   url: 'https://calendly.com/skylinemeridian',
//   parentElement: document.getElementById('SAMPLEdivID'),
//   prefill: {},
//   utm: {}
// });

$(document).ready(function () {
  $('.arrow-hover').hide();
  $('.hero .learner, .hero .admin').on('mouseover', function () {
    $(this).find('.transparent-btn').css('background-color', '#6bcfcfE6');
    $(this).find('.transparent-btn span').css('color', '#15161C');
    $(this).find('.arrow').hide();
    $(this).find('.arrow-hover').show();
    $(this).addClass('hover-on-hero-image');
  });
  $('.hero .learner, .hero .admin').on('mouseleave', function () {
    $(this).find('.transparent-btn').css('background-color', '#101012E6');
    $(this).find('.transparent-btn span').css('color', '#EAEAEA');
    $(this).find('.arrow').show();
    $(this).find('.arrow-hover').hide();
    $(this).removeClass('hover-on-hero-image');
  });

  $('.mouse-cursor-gradient-tracking-btn')
    .not('.goto-features')
    .on('click', function () {
      // $('.popup').show();
      const pageName = $(location).attr('pathname').split('/').pop();
      let meetingLink = 'https://calendly.com/zicops/discovery';
      if (pageName === 'content-partners.html')
        meetingLink = 'https://calendly.com/zicops-content-partner/meetup';
      Calendly.initPopupWidget({
        url: meetingLink
        // url: 'https://calendly.com/skylinemeridian/30min?hide_gdpr_banner=0'
      });
      return false;
    });

  $('.hamburger-menu-btn').on('click', function (e) {
    e.stopPropagation();
    $('.navbar-links').toggleClass('active');
  });
  $('body').on('click', function () {
    $('.navbar-links').removeClass('active');
  });

  $('#goto-learning-lxp').click(function () {
    $(document).scrollTop($('#learning-lxp').offset().top - 90);
  });
  $('#goto-admin-lxp').click(function () {
    $(document).scrollTop($('#admin-lxp').offset().top - 90);
  });

  $('#contact-form').submit(function (e) {
    e.preventDefault();
    var form = $(this);
    var actionUrl = '/api/sendEmail';

    let name = $('#name').val();
    let org = $('#org').val();
    let email = $('#email').val();
    let contact = $('#contact').val();

    if (name === '' || org === '' || email === '' || contact === '') {
      return showResponse('Please fill all fields before submitting.', 'error')
    }

    function showResponse(text, status) {
      let color = '#dedede';
      if (status === 'error') color = '#F53315'
      $('#form-response').html(
        `<small style="color: ${color}">${text}</small>`
      );
      setTimeout(() => {
        $('#form-response').empty();
      }, 5000);
    }

    let req = {
      recipient: 'jtas.sarkar@gmail.com',
      subject: 'Zicops Contact Form',
      message: `Hello,\n\rSomeone just contacted zicops, here's their details:\n\rName: ${name}\n\rOrganization: ${org}\n\rEmail: ${email}\n\rContact: ${contact}`
    };

    $.ajax({
      type: 'POST',
      url: actionUrl,
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(req),
      success: function (data) {
        console.log('success', data)
        showResponse('Thank you for contacting Zicops. We will get back to you soon.');
      },
      error: function (err) {
        console.log('error', err);
        if (err.responseText == 'Email Send Successfully') {
          showResponse('Thank you for contacting Zicops. We will get back to you soon.');
        } else {
          showResponse('Form could not be submitted at the moment, please try again later.', 'error');
        }
      }
    });
  });
});

// window.onload = function () {
//   let animations = document.querySelectorAll(".animation-wrapper");
//   for (let i = 0; i < animations.length; ++i) {
//     animations[i].classList.add("animate");
//   }
// };
let animations = document.querySelectorAll('.animation-wrapper');

let animationsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  },
  {
    threshold: 0.5
  }
);

animations.forEach((animation) => {
  animationsObserver.observe(animation);
});
