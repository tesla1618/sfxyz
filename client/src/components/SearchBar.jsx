import React, { useState, useEffect } from "react";
import "../css/SearchMenu.css";
import { API_URL } from "../config";
import axios from "axios";
import "../css/Search.css";

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
          <div className="searchResults">
            <b>Results for {query}</b>
            {fdata.length > 0 ? (
              fdata.map((item) => (
                <div key={item.id}>{item.name}</div>
                // You can render other data properties here
              ))
            ) : (
              <div>No results found</div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchMenu;
