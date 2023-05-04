import "./Home.css";

// Components
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { RiImageAddFill } from "react-icons/ri";

const Home = () => {
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
        <div className="profile-info">
          <h2>Nome do Cabra</h2>
          <p>Biografia do Cabra</p>
          <p>Cargo do Cabra</p>
        </div>
      </div>
      <div className="galley-title">
        <h2>Fotos Publicadas</h2>
        <RiImageAddFill />
      </div>
      <div className="gallery">
        <div>Foto Teste</div>
        <div>Foto Teste</div>
        <div>Foto Teste</div>
        <div>Foto Teste</div>
        <div>Foto Teste</div>
      </div>
    </div>
  );
};

export default Home;
