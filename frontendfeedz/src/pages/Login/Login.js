import "./Auth.css";

// Components
import { Link } from "react-router-dom";
//import Message from "../../components/Message"

// Hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSunmit = (e) => {
    e.preventDefault();
  };

  return (
    <div id="home">
      <div className="conteiner-box">
        <div className="information">
          <h2>Feedz 3S</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis
            voluptate corrupti blanditiis. At nulla explicabo magnam saepe iusto
            voluptas porro.
          </p>
        </div>
        <div className="login">
          <h2>Faça login para continuar</h2>
          <form onChange={handleSunmit}>
            <input
              type="text"
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
              value={email || ""}
            />
            <input
              type="text"
              placeholder="Senha"
              onChange={(e) => setPassword(e.target.value)}
              value={password || ""}
            />
            <input type="submit" value="Entrar" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
