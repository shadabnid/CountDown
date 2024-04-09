import React from 'react'
import './UserItem.css';

const UserItem = ({ user }) => {
  return (
    <div className='card'>
      <h2>{user.name}</h2>
      <p> <span>Email :</span> {user.email}</p>
      <p><span>Phone :</span> {user.phone}</p>
      <p><span>address :</span>{user.address.city}</p>

    </div>
  )
}

export default UserItem