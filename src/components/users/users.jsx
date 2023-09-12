import React, { useState, useEffect } from 'react';

export default function Users() {
  const [users, setUsers] = useState([]);

  const getAllUsers = () => {
    fetch("https://api.github.com/users")
      .then(res => res.json())
      .then(response => setUsers(response))
      .catch(err => console.log(err));
  };

  const deleteUser = (id) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
  };

  return (
    <div className="container">
      <h1 className="text-center mt-4">List of Users</h1>
      <div className="row">
        {users.map(user => (
          <div key={user.id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card">
              <img src={user.avatar_url} className="card-img-top" alt={user.login} />
              <div className="card-body">
                <h5 className="card-title text-center">{user.login}</h5>
                <div className="text-center">
                  <a href={user.html_url} className="btn btn-primary">Profile</a>
                  <button onClick={() => deleteUser(user.id)} className="btn btn-danger ml-2">Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={getAllUsers} className="btn btn-success mt-3">Get All Users</button>
    </div>
  );
}