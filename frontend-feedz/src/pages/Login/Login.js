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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container-login">
      <div className="container-login-box">
        <div className="information">
          <h2>Feedz 3S</h2>
          <p>Bem vindo ao Feedz / Tvs</p>
        </div>
        <div className="login">
          <h2>Faça login para continuar!</h2>
          <form onChange={handleSubmit}>
            <input
              type="text"
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
              value={email || ""}
              autoFocus
              className="input-text"
            />
            <input
              type="text"
              placeholder="Senha"
              onChange={(e) => setPassword(e.target.value)}
              value={password || ""}
              className="input-text"
            />
            <input type="submit" value="Entrar" className="btn-submit" />
            <Link to={"/"}>HOME</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
