import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export default function Users() {
  const [users, setUsers] = useState([]);

  const getAllUsers = () => {
    fetch('https://api.github.com/users')
      .then((res) => res.json())
      .then((response) => setUsers(response))
      .catch((err) => console.log(err));
  };

  const deleteUser = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this user!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      darkMode: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setUsers(users.filter((user) => user.id !== id));
        Swal.fire('Deleted!', 'The user has been deleted.', 'success');
      }
    });
  };

  return (
    <div className="container">
      <div className="row">
      {users.length>0?(<h1 className="text-center mt-4 col-12">List of Users</h1>):
        (<><h1 className="text-center mt-4 col-6">List of Users</h1>
        <div className="text-center mt-4 col-6">
          <button onClick={getAllUsers} className="btn btn-success mt-3">
            Get All Users
          </button>
        </div></>)}
      </div>
      <div className="row">
        {users.length>0 ? (
          users.map((user) => (
            <div key={user.id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="card">
                <img src={user.avatar_url} className="card-img-top" alt={user.login} />
                <div className="card-body">
                  <h5 className="card-title text-center">{user.login}</h5>
                  <div className="text-center">
                    <a href={user.html_url} className="btn btn-primary">
                      Profile
                    </a>&nbsp;&nbsp;
                    <button onClick={() => deleteUser(user.id)} className="btn btn-danger ml-2">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h4 className='text-center mt-4 col-12 text-danger' color="white">Click the button</h4>
        )}
      </div>
    </div>
  );
}