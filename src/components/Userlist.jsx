import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  IoTrashBin,
  IoLockClosedOutline,
  IoLockOpenOutline,
  IoCheckboxOutline,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LogOut, reset } from "../features/authSlice";

const Userlist = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectUser] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = useCallback(() => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  }, [dispatch, navigate]);

  const exit = useCallback(
    (error) => error.response.status === 406 && logout(),
    [logout]
  );

  useEffect(() => {
    (async () => {
      const res = await axios.get("http://localhost:5000/users").catch(exit);
      setUsers(res.data);
    })();
  }, [exit]);

  const blockUsers = async () => {
    const data = selectedUsers.reduce((prev, curr) => {
      const user = users.find((user) => user.uuid === curr);
      if (!user) return prev;
      return [...prev, { ...user, status: true }];
    }, []);
    await axios
      .post(`http://localhost:5000/users/block`, data)
      .then(() => {
        if (selectedUsers.includes(user.uuid)) {
          logout();
        } else {
          setUsers((prev) =>
            prev.reduce((prev, curr) => {
              const user = data.find((user) => user.uuid === curr.uuid);
              if (!user) return [...prev, curr];
              return [...prev, user];
            }, [])
          );
        }
      })
      .catch(exit);
  };

  const unBlockUsers = async () => {
    const data = selectedUsers.reduce((prev, curr) => {
      const user = users.find((user) => user.uuid === curr);
      if (!user) return prev;
      return [...prev, { ...user, status: false }];
    }, []);
    await axios
      .post(`http://localhost:5000/users/unblock`, data)
      .then(() => {
        setUsers((prev) =>
          prev.reduce((prev, curr) => {
            const user = data.find((user) => user.uuid === curr.uuid);
            if (!user) return [...prev, curr];
            return [...prev, user];
          }, [])
        );
      })
      .catch(exit);
  };

  const deleteUsers = async () => {
    await axios
      .post(`http://localhost:5000/users/delete`, selectedUsers)
      .then(() => {
        if (selectedUsers.includes(user.uuid)) {
          logout();
        } else {
          setUsers((prev) =>
            prev.filter((item) => !selectedUsers.includes(item.uuid))
          );
        }
      })
      .catch(exit);
  };

  const handleSelectUser = (userId) => {
    setSelectUser((prev) =>
      prev.includes(userId)
        ? prev.filter((item) => item !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectUsers = (users) => {
    for (let i = 0; i < users.length; i++) {
      handleSelectUser(users[i].uuid);
    }
  };

  return (
    <div>
      <h1 className="title">Users</h1>
      <h2 className="subtitle">Toolbar</h2>
      <div className="field is-grouped">
        <p className="control">
          <button className="button is-danger" onClick={deleteUsers}>
            <IoTrashBin />
            Delete user
          </button>
        </p>
        <p className="control">
          <button className="button is-link" onClick={blockUsers}>
            <IoLockClosedOutline />
          </button>
        </p>
        <p className="control">
          <button className="button is-link" onClick={unBlockUsers}>
            <IoLockOpenOutline />
          </button>
        </p>
      </div>
      <h2 className="subtitle">List of Users</h2>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>
              <button
                className="button"
                onClick={() => handleSelectUsers(users)}
              >
                <IoCheckboxOutline />
                Select
              </button>
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Created</th>
            <th>Last login</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.uuid}>
              <td>
                <label className="checkbox">
                  <input
                    checked={selectedUsers.includes(user.uuid)}
                    type="checkbox"
                    onChange={() => handleSelectUser(user.uuid)}
                  />
                </label>
              </td>
              <td>{user.uuid}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.createdAt}</td>
              <td>{user.updatedAt}</td>
              <td>{Number(user.status) ? "banned" : "unbanned"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Userlist;
