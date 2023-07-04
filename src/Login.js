import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  //username variable is declared and initiliased with empty strings
  //_change updates the value of the initial state "username"
  //reason when we e.target the value in input, it allows the new state
  //which is the username and password inputed to be displayed on the UI. 
  const [username, usernamechange] = useState("");
  const [password, passwordchange] = useState("");

  const navigate = useNavigate();

//onload, actually does nothing. take out. 
  // useEffect(() => {
  //   const isLoggedIn = sessionStorage.getItem("username");
  //   if (isLoggedIn) {
  //     navigate("/");
  //     console.log(isLoggedIn)
  //   }
  // }, []);


  //handles the login process.
  const handlelogin = (e) => {
    e.preventDefault();
    //if the validate function is completed, it fetches data from the db.json
    //to implement login. need a walk through still.
    if (validate()) {
      //login implementation
      //i used Fetch API to send an HTTP request to my api endpoint(http://localhost:8000/user/) and handle the response.
      //passed the username by concating to endpoint api so the eresult is specific to whomever signs in as in welcome {naming}.
      fetch("http://localhost:8000/user/" + username)
        .then((res) => {
          //this converts (res)ponse to a json format
          return res.json();
        })
        //.then accepts the json format as resp. 
        .then((resp) => {
          //console.log(resp); check later maybe.
          //if the resp(onse) lenght is empty, toast error msg.
          if (Object.keys(resp).length === 0) {
            toast.error("Please enter valid username");
          } else {
            //if the resp(onse) isn't empty, then confirm if logged password matches p.value
            //toast success and take me home.
            if (resp.password === password) {
              toast.success("Success");
              navigate("/");
              //the "username" value is then stored is sessionstorage.
              sessionStorage.setItem("username", username);
              
            } else {
              //toast error msg if password don't match
              toast.error("Please enter valid password");
            }
          }
        })
        //if there's and error in this fetch proccess ish, toast error msg.
        .catch((err) => {
          toast.error("failed to login:" + err.message);
        });
    }
  };

  //authenticates username and password.
  const validate = () => {
    let result = true;
    if (username === "" || username === null) {
      result = false;
      toast.warning("Please Enter Username");
    }
    if (password === "" || password === null) {
      result = false;
      toast.warning("put you Password");
    }
    return result;
  };

  return (
    <div className="row">
      <div className="off-set-lg-3 col-lg-6">
        <form onSubmit={handlelogin} className="container">
          <div className="card">
            <div className="card-header">
              <h2>User Login</h2>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>
                  User Name <span className="errmsg">*</span>
                </label>
                <input
                  value={username}
                  onChange={(e) => usernamechange(e.target.value)}
                  className="form-control"
                ></input>
              </div>
              <div className="form-group">
                <label>
                  Password <span className="errmsg">*</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => passwordchange(e.target.value)}
                  className="form-control"
                ></input>
              </div>
            </div>
            <div className="card-footer">
              <button
                type="submit"
                className="btn btn-primary"
              >
                Login
              </button>{" "}
              |
              <Link className="btn btn-success" to={"/register"}>
                New User
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
