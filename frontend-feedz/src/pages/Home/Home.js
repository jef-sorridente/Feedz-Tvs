import "./Home.css";

// Components
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {RiImageAddFill} from "react-icons/ri"

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
    <div className="container-home">
      <div className="container-home-box">
        <div className="profile">
          <div className="">
            <img src="" />
            <Link to={"/login"}>Clique aqui</Link>
          </div>
          <p>Bio</p>
        </div>
        <div className="photos">
          <h2>Fotos</h2>
          <div className="photos-container">
            <div className="photo">Foto Teste</div>
            <div className="photo">Foto Teste</div>
            <div className="photo">Foto Teste</div>
            <div className="photo">Foto Teste</div>
            <div className="photo">Foto Teste</div>
            <label htmlFor="add-file" className="photo add-photo">
              <p>Adicionar</p>
              <RiImageAddFill/>
            </label>
            <input type="file"id="add-file"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
