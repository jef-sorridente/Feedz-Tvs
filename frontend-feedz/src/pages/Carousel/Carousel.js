import React from "react";
import "./Carousel.css";

import { uploads } from "../../utils/config";

// Redux
import { getUserPhotos } from "../../slices/photoSlice.js";
import { useDispatch, useSelector } from "react-redux";

// Hooks
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { render } from "react-dom";

//Carousel
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.user);
  const {
    photos,
    loading: loadingPhoto,
    error: errorPhoto,
    message: messagePhoto,
  } = useSelector((state) => state.photo);

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
    autoplaySpeed: 20000,
    cssEase: "linear",
  };

  if (loadingPhoto) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
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
      <NavLink className="btn-back-home" to="/">Voltar</NavLink>
    </div>
  );
};

export default Carousel;
