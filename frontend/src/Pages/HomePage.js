import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HomePage.css";

const HomePage = () => {
  const [home, setHome] = useState([]);

  useEffect(() => {
    async function getHomeList() {
      const response = await axios.get("http://127.0.0.1:8000/api/homeThings/");
      console.log(response.data);
      setHome(response.data);
    }

    getHomeList();
  }, []);

  return (
    <div className="card">
      {home.map((item) => (
        <div className="card-item" key={item.id}>
          <img
            src={item.image ? "http://localhost:8000" + item.image : "profile"}
            alt={item.title}
          />
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
