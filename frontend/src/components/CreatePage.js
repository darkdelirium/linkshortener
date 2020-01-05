import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useHttp } from "../hooks/httphook.js";
import { AuthContext } from "../context/authContext.js";

export const CreatePage = () => {
  const { request } = useHttp();
  const history = useHistory();
  const [url, setUrl] = useState("");
  const auth = useContext(AuthContext);
  const pressHandler = async event => {
    console.log("Press handler", event.key);
    if (event.key === "Enter") {
      try {
        console.log("Try to call backend..,");
        const data = await request(
          "/api/link/generate",
          "POST",
          {
            from: url
          },
          { Authorization: `Bearer ${auth.token}` }
        );
        console.log(data);
        history.push(`detail/${data.link._id}`);
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <React.Fragment>
      <h4>Create a new link</h4>
      <div className="row">
        <div className="col s8 offset-s2">
          <div className="input-field">
            <label htmlFor="url">Type URL and press Enter</label>
            <input
              placeholder="url"
              id="url"
              type="text"
              value={url}
              onChange={e => setUrl(e.target.value)}
              onKeyPress={pressHandler}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
