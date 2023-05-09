import "./Home.css";

import { uploads } from "../../utils/config";

// Components
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import { RiImageAddFill } from "react-icons/ri";
import { AiOutlineReload } from "react-icons/ai";
import Message from "../../components/Message/Message";

//Hooks
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Redux
import { getUserDetails, resetMessage } from "../../slices/userSlice";
import {
  publishPhoto,
  getUserPhotos,
  deletePhoto,
} from "../../slices/photoSlice";

//import { useState } from "react";

const Home = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user, loading, error } = useSelector((state) => state.user);
  const {
    photos,
    loading: loadingPhoto,
    error: errorPhoto,
    message: messagePhoto,
  } = useSelector((state) => state.photo);

  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  //Carrega o Usuário
  useEffect(() => {
    dispatch(getUserDetails(id));
    dispatch(getUserPhotos(id));
  }, [dispatch, id]);

  const handleFile = (e) => {
    const image = e.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(image);

    setImage(image);
  };

  // Faz Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
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

    setImage("");

    setImageUrl("");
    // resetComponentMessage();
  };

  // Deletar a foto
  const handleDelete = (id) => {
    dispatch(deletePhoto(id));

    //resetComponentMessage();
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="container-gallery">
      <div className="profile">
        <div className="profile-infos">
          <div className="img">
            {user.profileImage && (
              <img
                className="img-real"
                src={`${uploads}/users/${user.profileImage}`}
                alt={user.name}
              />
            )}
          </div>
          <div className="profile-info">
            <h2>{user.name}</h2>
            <p>{user.bio}</p>
            <p>Cargo do Cabra</p>
          </div>
        </div>
        <div className="profile-buttons">
          <span onClick={handleLogout}>Sair</span>
          <NavLink to={`/carousel/${user._id}`}>Demonstração</NavLink>
        </div>
      </div>
      <div className="gallery-title">
        <h2>Fotos Publicadas</h2>
        <form onSubmit={submitHandle} className="submit-photo">
          {!imageUrl ? (
            <label htmlFor="photoPost">
              <RiImageAddFill />
            </label>
          ) : (
            <label htmlFor="photoPost">
              <AiOutlineReload />
            </label>
          )}

          {imageUrl && (
            <img
              src={imageUrl}
              alt="Imagem selecionada"
              className="image-URL"
            />
          )}

          <input type="file" id="photoPost" onChange={handleFile} />

          {!loadingPhoto && (
            <input type="submit" value="Postar" className="btn-submit-photo" />
          )}
          {loadingPhoto && <input type="submit" value="Aguarde..." disabled />}
          {errorPhoto && <Message msg={errorPhoto} type="error" />}
        </form>
      </div>
      <div className="gallery">
        {photos &&
          photos.map((photo) => (
            <div key={photo._id} className="gallery-photos">
              {photo.image && (
                <img
                  src={`${uploads}/photos/${photo.image}`}
                  alt={photo.title}
                />
              )}
              <button
                onClick={() => handleDelete(photo._id)}
                className="btn-delet"
              >
                Apagar
              </button>
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
