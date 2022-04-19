import React, { useContext } from 'react'
import { RouteKeyContext } from '../../Context/RouteContext'

export default function UserDetail() {
  const context = useContext(RouteKeyContext)

  return (
    <div className="container">
      <div className="avatar-flip">
        <img src={context.dataEdit.avatar} height="150" width="150" />
        <img
          src="http://i1112.photobucket.com/albums/k497/animalsbeingdicks/abd-3-12-2015.gif~original"
          height="150"
          width="150"
        />
      </div>
      <h2>{context.dataEdit.name}</h2>
      <h4>User Profile</h4>

      <div style={{ display: 'flex' }}>
        <div style={{ textAlign: 'left' }}>
          <p>ID: {context.dataEdit.id}</p>
          <p>Username: {context.dataEdit.username}</p>
          <p>Email: {context.dataEdit.email}</p>
          <p>Address: {context.dataEdit.address}</p>
        </div>

        <div style={{ textAlign: 'left' }}>
          <p>Phone Number: {context.dataEdit.phoneNumber}</p>
          <p>Website: {context.dataEdit.website}</p>
          <p>Company: {context.dataEdit.company}</p>
          <p>Role: {context.dataEdit.role}</p>
        </div>
      </div>
    </div>
  )
}
