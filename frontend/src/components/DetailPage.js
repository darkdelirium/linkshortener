import React, { useState, useCallback, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHttp } from "../hooks/httphook";
import { AuthContext } from "../context/authContext";
import { Loader } from "./Loader.jsx";
import { LinkCard } from "./LinkCard.jsx";

export const DetailPage = () => {
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [link, setLink] = useState(null);
  const linkId = useParams().id;

  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`/api/link/${linkId}`, "GET", null, {
        Authorization: `Bearer ${token}`
      });
      setLink(fetched);
      console.log(`detail page ${fetched}`);
    } catch (e) {
      console.log(e.message);
    }
  }, [token, linkId, request]);

  useEffect(() => {
    getLink();
  }, [getLink]);
  if (loading) {
    return <Loader />;
  }
  console.log(`page detail id ${linkId}`);
  return (
    <React.Fragment>
      <h1>DetailPage</h1>
      {!loading && link && <LinkCard link={link} />}
    </React.Fragment>
  );
};
