import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState("");

  const searchAllUsers = () => {
    setUsers("")
    setTimeout(() => {
    if (user) {
      fetch(`https://api.github.com/search/users?q=${user}`)
        .then((res) => res.json())
        .then((response) => {
          console.log(user);
          if (response) {
            setUsers(response.items);
          }
        });
    } else {
      getAllUsers();
    }}, 1000);
  };

  const getAllUsers = () => {
    console.log(user)
    setTimeout(() => {
      fetch("https://api.github.com/users")
        .then((res) => res.json())
        .then((response) => setUsers(response))
        .catch((err) => console.log(err));
    }, 1000);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const deleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      darkMode: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setUsers(users.filter((user) => user.id !== id));
        Swal.fire("Deleted!", "The user has been deleted.", "success");
      }
    });
  };

  return (
    <div className="container">
      <div className="rowr">
        <h1 className="text-center mt-4 col-4">List of Users</h1>
        <div className="input-group mb-3 col-6">
          <button
            className="btn btn-outline-danger"
            type="button"
            id="button-addon1"
            onClick={searchAllUsers}
          >
            Search
          </button>
          <input
            type="text"
            className="form-control  d-inline-block"
            placeholder="search"
            style={{ width: "50%" }}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        {users.length > 0 ? (users.map((user) => (
          <div key={user.id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card">
              <img
                src={user.avatar_url}
                className="card-img-top"
                alt={user.login}
              />
              <div className="card-body">
                <h5 className="card-title text-center">{user.login}</h5>
                <div className="text-center">
                  <a href={user.html_url} className="btn btn-primary">
                    Profile
                  </a>
                  &nbsp;&nbsp;
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="btn btn-danger ml-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))):(<div className="spinner-border text-light text-center mt-4" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>)}
      </div>
    </div>
  );
}