import React, { useState } from "react";
import "./Carousel.css";

import { uploads } from "../../utils/config";

// Redux
import { getUserPhotos } from "../../slices/photoSlice.js";
import { useDispatch, useSelector } from "react-redux";

// Hooks
import { useEffect } from "react";
import { useParams } from "react-router-dom";

//Carousel
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { photos, loading: loadingPhoto } = useSelector((state) => state.photo);

  //Carrega o Usuário
  useEffect(() => {
    dispatch(getUserPhotos(id));
  }, [dispatch, id]);

  //Configurações Slider
  const settings = {
    infinite: true,
    speed: 500,
    infinite: true,
    fade: true,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: false,
  };

  const [autoplaySpeed, setAutoplaySpeed] = useState("");

  console.log("AutoPlay" + settings.autoplaySpeed);

  if (loadingPhoto) {
    return <p>Carregando...</p>;
  }

  return (
    <Slider {...settings}>
      {photos &&
        photos.map((photo) => (
          <div key={photo._id} className="container-photos">
            {photo.image && (
              <img
                src={`${uploads}/photos/${photo.image}`}
                alt={photo.title}
                className="photos"
              />
            )}
          </div>
        ))}
      {photos && photos.length === 0 && (
        <h2 className="no-photos">Ainda não há fotos publicadas.</h2>
      )}
    </Slider>
  );
};

export default Carousel;
