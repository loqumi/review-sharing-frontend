import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditReview = () => {
  const [title, setTitle] = useState("");
  const [product, setProduct] = useState("");
  const [group, setGroup] = useState("");
  const [tag, setTag] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState("");
  const [msg, setMsg] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getReviewById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/reviews/${id}`);
        setTitle(response.data.title);
        setProduct(response.data.product);
        setGroup(response.data.group);
        setTag(response.data.tag);
        setText(response.data.text);
        setRating(response.data.rating);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getReviewById();
  }, [id]);

  const updateReview = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/reviews/${id}`, {
        title,
        product,
        group,
        tag,
        text,
        rating,
      });
      navigate("/");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Reviews</h1>
      <h2 className="subtitle">Edit Review</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateReview}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Review Name"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Price</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    placeholder="Price"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Price</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={group}
                    onChange={(e) => setGroup(e.target.value)}
                    placeholder="Price"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Price</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    placeholder="Price"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Price</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Price"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Price</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    placeholder="Price"
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEditReview;
