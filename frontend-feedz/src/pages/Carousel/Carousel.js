import "./Carousel.js";

import { Carousel, Slider } from "react-carousel"

const Carousel = () => {
  const options = {
    slidesToshow: 1,
    transitionMs: 500
  }
  return <div>
    {photos && photos.map((photo) => (
      <Carousel key={photo._id}>
        <Slide>
          {photo.image && (<img src={`${uploads}/photos/${photo.image}`}
            alt={photo.title}></img>)}
        </Slide>
      </Carousel>
    ))}
  </div>;
};

export default Carousel;
