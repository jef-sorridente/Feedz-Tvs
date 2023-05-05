import "./Home.css";

// Components
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { RiImageAddFill } from "react-icons/ri";
import { BsXLg } from "react-icons/bs";
import { uploads } from "../../utils/config";

// Hooks
//import { useAuth } from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Redux
import { logout, reset } from "../../slices/authSlice";
import { profile } from "../../slices/userSlice";
import { getPhotos, publishPhoto, deletePhoto } from "../../slices/photoSlice";

//import { useState } from "react";

const Home = () => {
  const navigate = useNavigate();

  const [image, setImage] = useState("");

  const dispatch = useDispatch();
  const { user, message, error, loading } = useSelector((state) => state.user);
  const { photos, loadingPhoto } = useSelector((state) => state.photo);

  useEffect(() => {
    dispatch(profile());
    dispatch(getPhotos());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };
  const handleFile = (e) => {
    const image = e.target.files[0];

    setImage(image);
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
  };

  // Deletar a foto
  const handleDelete = (id) => {
    dispatch(deletePhoto(id));
  };

  if (loading) {
    return <p>Carregando...</p>;
  }
  {
    /*
  Botão para Modificar de Login p/ Cadastro
  const [myClass, setMyClass] = useState("primaria");
  function alternateClass() {
    if (myClass === "primaria") {
      setMyClass("secundaria");
    } else {
      setMyClass("primaria");
    }
  }
  useEffect(() => {
    const elemento = document.querySelector(".elemento-a-modificar");
    elemento.classList.remove("primaria");
    elemento.classList.remove("secundaria");
    elemento.classList.add(myClass);
  }, [myClass]);*/
    /* 
        Botão para Modificar de Login p/ Cadastro
      <div className="elemento-a-modificar">
        <button onClick={alternateClass}>Teste</button>
      </div>*/
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
              <button onClick={() => handleDelete(photo._id)} />
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
