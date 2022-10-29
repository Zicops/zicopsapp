window.onscroll = function () {
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      document.getElementById("navbar").style.height = "50px";
      document.getElementById("navbar").style.backgroundColor = "#131518";
    } else {
        document.getElementById("navbar").style.height = "100px";
        document.getElementById("navbar").style.backgroundColor = "transparent";
    }
}

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