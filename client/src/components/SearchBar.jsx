import React, { useState, useEffect } from "react";
import "../css/SearchMenu.css";
import { API_URL } from "../config";
import axios from "axios";
import "../css/Search.css";
import { Link } from "react-router-dom";

const LOCALHOST = `${API_URL}`;

const SearchMenu = () => {
  const [query, setQuery] = useState("");
  useEffect(() => {
    fetchData();
  }, [query]);
  const [data, setData] = useState([]);
  console.log("data: ", data);

  const fetchData = async () => {
    const result = await axios(`${LOCALHOST}/api/events/?search=${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setData(result.data.results);
  };
  const fdata = data.filter((item) => !item.isPrivate);

  return (
    <>
      <div className="search-menu-container">
        <div className="search-menu">
          <input autocomplete="off" type="text" name="query" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for an event or join by seatcode" className={query.length > 0 ? "search-input-2" : "search-input"} />
        </div>
      </div>
      {query.length > 0 && (
        <div className="container-sf">
          <div className="searchResults py-4">
            <b className="mx-3 mb-3">
              Results for <b className="text-primary">{query}</b>
            </b>
            {fdata.length > 0 ? (
              fdata.map((item) => (
                <Link to={`/${item.link}`} className="no-und">
                  <div key={item.id} className="my-3">
                    <img src={item.thumb} alt={item.name} width="40" height="40" className="mx-2" /> {item.name}
                  </div>
                </Link>
                // You can render other data properties here
              ))
            ) : (
              <div className="mx-3 mt-3 text-danger">No results found</div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchMenu;
