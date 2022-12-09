import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { reset } from "../features/authSlice";
import axios from "axios";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = React.useCallback(() => {
    dispatch(reset());
    navigate("/");
  }, [dispatch, navigate]);

  const login = React.useCallback(
    (error) => error.response.status === 401 && logout(),
    [logout]
  );

  const getReviews = React.useCallback(async () => {
    const response = await axios
      .get("http://localhost:5000/reviews")
      .catch(login);
    setReviews(response.data);
  }, [login]);

  const deleteReview = async (reviewId) => {
    await axios
      .delete(`http://localhost:5000/reviews/${reviewId}`)
      .catch(login);
    getReviews();
  };

  useEffect(() => {
    getReviews();
  }, [getReviews]);

  return (
    <div>
      <h1 className="title">Reviews</h1>
      <h2 className="subtitle">List of Reviews</h2>
      <Link to="/reviews/add" className="button is-primary mb-2">
        Add New
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Review Name</th>
            <th>Price</th>
            <th>Created By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review, index) => (
            <tr key={review.uuid}>
              <td>{index + 1}</td>
              <td>{review.name}</td>
              <td>{review.price}</td>
              <td>{review.user.name}</td>
              <td>
                <Link
                  to={`/reviews/edit/${review.uuid}`}
                  className="button is-small is-info"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteReview(review.uuid)}
                  className="button is-small is-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewList;
