import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  //state variable is declared and initiliased with empty strings useState("").
  //usestae returns two array with two elements: 
  //1. the current state value (username|password) 
  //2. function to update that value (usernamechange|passwordchange). 
  const [username, usernamechange] = useState("");
  const [password, passwordchange] = useState("");

  const navigate = useNavigate();

  //handles the login submit process.
  //handlelogin function takes an event as an arg
  const handlelogin = (e) => {
    e.preventDefault();
    //if the validate function is completed, it fetches data from the db.json
    //to implement login. need a walk through still.
    if (validate()) {
      //login implementation
      //used Fetch API to send a GET HTTP request to an api endpoint(http://localhost:8000/user/ which was provided by json server)- https://www.npmjs.com/package/json-server
      //and handle the response.
      //passed the username by concating to endpoint api so the eresult is specific to whomever signs in as in welcome {naming}.
      fetch("http://localhost:8000/user/" + username)
      //.then parses the response body as JSON by calling res.json()
        .then((res) => {
          //converts (res)ponse to a json format
          return res.json();
        })
        //.then contains the json format as resp. 
        .then((resp) => {
          //if the resp(onse) length is empty(if number of keys in resp obj = 0), toast error msg.
          //toast error if response is empty.
          if (!Object.keys(resp).length) {
            toast.error("Please enter valid username");
          } else {
            //if the resp(onse) isn't empty, then confirm if logged password matches p.value
            //toast success and take me home.
            if (resp.password === password) {
              //the "username" value is then stored(set) is sessionstorage.
              sessionStorage.setItem("username", username);
              toast.success("Success");
              navigate("/");
              
            } else {
              //toast error msg if password don't match
              toast.error("incorrect password");
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
    //if username is empty, it returns false and toasts warning msg.
    if (!username) {
      result = false;
      toast.warning("Please Enter Username");
    }
    //same with username
    if (!password) {
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
