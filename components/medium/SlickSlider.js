import Slider from "react-slick";
import Card from "../small/SingleCard";

export default function SlickSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1
  }
  return (
    <Slider {...settings}>
      {/* <div style={{backgroundColor: 'red'}}>
        <h3>1</h3>
      </div> */}
        <Card image="/images/courses/26.png" />
        <Card image="/images/courses/25.png" />
        <Card image="/images/courses/27.png" />
        <Card image="/images/courses/46.png" />
      {/* <div>
        <h3>6</h3>
      </div> */}
    </Slider>
  );
}