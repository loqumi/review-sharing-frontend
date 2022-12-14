import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Welcome = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setName(response.data.name);
        setEmail(response.data.email);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getUserById();
  }, [id]);

  return (
    <div>
      <h1 className="title">Dashboard</h1>
      <h2 className="subtitle">
        Welcome Back{" "}
        <strong>
          {name}
          {email}
          {msg}
        </strong>
      </h2>
    </div>
  );
};

export default Welcome;
