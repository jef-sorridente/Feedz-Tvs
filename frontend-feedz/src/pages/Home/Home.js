import "./Home.css";

import { uploads } from "../../utils/config";

// Components
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import { RiImageAddFill } from "react-icons/ri";

//Hooks
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Redux
import { logout, reset } from "../../slices/authSlice";
import { getUserDetails } from "../../slices/userSlice";
import {
  publishPhoto,
  getUserPhotos,
  deletePhoto,
} from "../../slices/photoSlice";

//import { useState } from "react";

const Home = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user, loading } = useSelector((state) => state.user);
  const {
    photos,
    loading: loadingPhoto,
    error: errorPhoto,
    message: messagePhoto,
  } = useSelector((state) => state.photo);

  const [image, setImage] = useState("");

  //Carrega o Usuário
  useEffect(() => {
    dispatch(getUserDetails(id));
    dispatch(getUserPhotos(id));
  }, [dispatch, id]);

  const handleFile = (e) => {
    const image = e.target.files[0];

    setImage(image);
  };

  // Faz Logout
  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());

    navigate("/login");
  };

  const submitHandle = (e) => {
    e.preventDefault();

    const photoData = {
      image,
    };

    // Construir formulário dos Dados
    const formData = new FormData();

    const photoFormData = Object.keys(photoData).forEach((key) =>
      formData.append(key, photoData[key])
    );

    formData.append("photo", photoFormData);

    dispatch(publishPhoto(formData));

    //setTitle("");

    //resetComponentMessage();
  };

  // Deletar a foto
  const handleDelete = (id) => {
    dispatch(deletePhoto(id));

   // resetComponentMessage();
  };

  if (loading) {
    return <p>Carregando...</p>;
  }
  
  return (
    <div className="container-gallery">
      <div className="profile">
        <div className="img">
          <div className="img-real"></div>
        </div>
        <span onClick={handleLogout}>Sair</span>
        <div className="profile-info">
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
          <p>Cargo do Cabra</p>
        </div>
      </div>
      <div className="galley-title">
        <h2>Fotos Publicadas</h2>
        <form onSubmit={submitHandle}>
          <input type="file" onChange={handleFile} />
          <RiImageAddFill />
          {!loadingPhoto && <input type="submit" value="Postar" />}
          {loadingPhoto && <input type="submit" value="Aguarde..." disabled />}
        </form>
      </div>
      <div className="gallery">
        {photos &&
          photos.map((photo) => (
            <div key={photo._id}>
              {photo.image && (
                <img
                  src={`${uploads}/photos/${photo.image}`}
                  alt={photo.title}
                />
              )}
              <button onClick={() => handleDelete(photo._id)}>Apagar</button>
            </div>
          ))}
        {photos && photos.length === 0 && (
          <h2 className="no-photos">Ainda não há fotos publicadas.</h2>
        )}
      </div>
    </div>
  );
};

export default Home;
