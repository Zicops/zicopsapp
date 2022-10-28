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