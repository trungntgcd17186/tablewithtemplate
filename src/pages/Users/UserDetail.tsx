import React from 'react'

export default function UserDetail() {
  const dataEdit = JSON.parse(localStorage.getItem('dataEdit') || '[]')
  return (
    <div className="container">
      <div className="avatar-flip">
        <img src={dataEdit.avatar} height="150" width="150" />
        <img
          src="http://i1112.photobucket.com/albums/k497/animalsbeingdicks/abd-3-12-2015.gif~original"
          height="150"
          width="150"
        />
      </div>
      <h2>{dataEdit.name}</h2>
      <h4>User Profile</h4>

      <div style={{ display: 'flex' }}>
        <div style={{ textAlign: 'left' }}>
          <p>ID: {dataEdit.id}</p>
          <p>Username: {dataEdit.username}</p>
          <p>Email: {dataEdit.email}</p>
          <p>Address: {dataEdit.address}</p>
        </div>

        <div style={{ textAlign: 'left' }}>
          <p>Phone Number: {dataEdit.phoneNumber}</p>
          <p>Website: {dataEdit.website}</p>
          <p>Company: {dataEdit.company}</p>
          <p>Role: {dataEdit.role}</p>
        </div>
      </div>
    </div>
  )
}
