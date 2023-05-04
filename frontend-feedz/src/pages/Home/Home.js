import "./Home.css";

// Components
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Link to={"/login"}>Clique aqui</Link>
    </div>
  );
};

export default Home;
