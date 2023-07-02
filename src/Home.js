import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate();

    useEffect(() => {
      let username = sessionStorage.getItem("username");
      if (username === null || username === "") {
        navigate("/login");
      }
    }, []);


  function logout() {
    sessionStorage.clear();
    console.log(logout)
    navigate("/login")
  }

  return (
    <div>
      <div className="header">
        <Link to={"/"}>Home</Link>
        <button onClick={logout} className="btn btn-danger">Logout</button>
      </div>
      <h1 className="text-center">Welcome {"Bee"}.</h1>
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
