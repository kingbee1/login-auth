import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  //if there's no username inputed on load, it goes to login page.
  useEffect(() => {
    let username = sessionStorage.getItem("username");
    if (username === null || username === "") {
      navigate("/login");
    }
  }, []);

  //to display whoever is logged in at the moment.
  let naming = sessionStorage.getItem("username");
  //     console.log(naming)

  //logs user out, clears storage and goes to login page.
  function logout() {
    sessionStorage.clear();
    navigate("/login");
  }

  return (
    <div>
      <div className="header">
        <Link to={"/"}>Home</Link>
        <button onClick={logout} className="btn btn-danger">
          Logout
        </button>
      </div>
      <h1 className="text-center text-capitalize">welcome {naming}</h1>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio totam,
        nulla incidunt architecto at dolorem alias libero quis quasi eaque
        perspiciatis minima dolor harum quia repudiandae corrupti esse tempore
        et soluta nemo ea nisi vero. Facere minima inventore in nobis.
      </p>
    </div>
  );
};

export default Home;
