import React, { useState, useEffect, useContext } from "react";
import { useHttp } from "../hooks/httphook";
import { useMessage } from "../hooks/messageHook";
import { AuthContext } from "../context/authContext.js";

const apiUri = "http://localhost:5000";

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      console.log(apiUri + "/api/auth/register");
      const data = await request(apiUri + "/api/auth/register", "POST", {
        ...form
      });
      message(data.message);
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request(apiUri + "/api/auth/login", "POST", {
        ...form
      });
      console.log("data", data);
      auth.login(data.token, data.userId);
    } catch (e) {}
  };
  return (
    <React.Fragment>
      <div className="row">
        <div className="col s6 offset-s3">
          <h1>Link Shortener</h1>
          <div className="card blue darken-1">
            <div className="card-content white-text">
              <span className="card-title">Login form</span>
              <div>
                <div className="input-field">
                  <label htmlFor="email">E-mail </label>
                  <input
                    placeholder="e-mail"
                    id="email"
                    type="text"
                    className="yellow-input"
                    name="email"
                    onChange={changeHandler}
                  />
                </div>
                <div className="input-field">
                  <label htmlFor="password">Password </label>
                  <input
                    placeholder="password"
                    id="password"
                    type="password"
                    className="yellow-input"
                    name="password"
                    onChange={changeHandler}
                  />
                </div>
              </div>
            </div>
            <div className="card-action">
              <button
                className="btn yellow darken-4 btn-login-margin"
                onClick={loginHandler}
              >
                Login
              </button>
              <button
                className="btn grey lighten-1 black-text"
                onClick={registerHandler}
                disabled={loading}
              >
                Registration
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
