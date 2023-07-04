import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Register = () => {
  //define states with empty initial strings and the one that updates the state (you put).
  const [id, idchange] = useState("");
  const [name, namechange] = useState("");
  const [password, passwordchange] = useState("");
  const [email, emailchange] = useState("");
  const [number, numberchange] = useState("");
  const [country, countrychange] = useState("");
  const [address, addresschange] = useState("");
  const [gender, genderchange] = useState("male");

  const navigate = useNavigate();

  //validates the information provided to create account.
  const IsValidate = () => {
    //isproceed and error message initialised with true and kpy respectively.
    let isproceed = true;
    let errormessage = "Kindly put your ";
    if (id === null || id === "") {
      isproceed = false;
      errormessage += "username ";
    }

    if (password === null || password === "") {
      isproceed = false;
      errormessage += "password ";
    }

    if (name === null || name === "") {
      isproceed = false;
      errormessage += "fullname ";
    }

    if (email === null || email === "") {
      isproceed = false;
      errormessage += "email";
    }
    if (!isproceed) {
      toast.warning(errormessage);
    } else {
      //if all ain't empty, regEx is used to confirm email matches this particular pattern.
      if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      } else {
        //if it doesn't match the pattern, toast warning message.
        isproceed = false;
        toast.warning("please enter a valid email address");
      }
    }
    //the function returns isproceed. it could be ture or flase as seen above.
    return isproceed;
  };

  const handlesubmit = (e) => {
    //prevents the natural form submission behavior which leads to reloading page.
    e.preventDefault();
    //declared an object containing the reg details required.
    let reg = { id, name, password, email, number, country, address, gender };
   //isValidate validates the data in reg. if it returns true, it fires the fetch.
    if (IsValidate()) {
      //console.log(reg);
      //walk through maybe. BRB.
      //Fetch here sends an http POST api endpoint/user
      fetch("http://localhost:8000/user", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(reg),
      })
      //when the fetch returns its promise in form of (res) successfully,
      //then, toast reg complete and go to login page.
        .then((res) => {
          toast.success("Resgistration Complete");
          navigate("/login");
        })
        //if the whole process fails or there's an error during the request, toast error message +the one from server.
        .catch((err) => {
          toast.error("Failed :" + err.message);
        });
    }
  };
  return (
    <div className="offset-lg-3 col-lg-6">
      <form className="container" action="" onSubmit={handlesubmit}>
        <div className="card">
          <div className="card-header">
            <h1>User Registration</h1>
          </div>
          <div className="card-header">
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <label>
                    User Name <span className="err-msg">*</span>
                  </label>
                  <input
                    value={id}
                    onChange={(e) => idchange(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="form-group">
                  <label>
                    Password <span className="err-msg">*</span>
                  </label>
                  <input
                    value={password}
                    onChange={(e) => passwordchange(e.target.value)}
                    type="password"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="form-group">
                  <label>
                    Full Name <span className="err-msg">*</span>
                  </label>
                  <input
                    value={name}
                    onChange={(e) => namechange(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="form-group">
                  <label>
                    Email <span className="err-msg">*</span>
                  </label>
                  <input
                    value={email}
                    onChange={(e) => emailchange(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="form-group">
                  <label>
                    Phone Number <span className="err-msg"></span>
                  </label>
                  <input
                    value={number}
                    onChange={(e) => numberchange(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="form-group">
                  <label>
                    Country <span className="err-msg"></span>
                  </label>
                  <select
                    value={country}
                    onChange={(e) => countrychange(e.target.value)}
                    className="form-control"
                  >
                    <option value="select">select</option>
                    <option value="nigeria">Nigeria</option>
                    <option value="usa">USA</option>
                    <option value="uk">United Kingdom</option>
                  </select>
                </div>
              </div>

              <div className="col-lg-12">
                <div className="form-group">
                  <label>Address</label>
                  <textarea
                    value={address}
                    onChange={(e) => addresschange(e.target.value)}
                    className="form-control"
                  ></textarea>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="form-group">
                  <label>Gender</label>
                  <br />
                  <input
                    type="radio"
                    checked={gender === "male"}
                    onChange={(e) => genderchange(e.target.value)}
                    name="gender"
                    value="male"
                    className="app-check"
                  ></input>
                  <label>Male</label>
                  <input
                    type="radio"
                    checked={gender === "female"}
                    onChange={(e) => genderchange(e.target.value)}
                    name="gender"
                    value="female"
                    className="app-check"
                  ></input>
                  <label>Female</label>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
            <Link className="btn btn-danger ms-2" to={"/login"}>
              Back
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
