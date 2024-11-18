import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const LogoutButton = () => {

    const {logout} = useContext(AuthContext)

  return (
    <div className='btn btn-logout' onClick={logout}>
        <img src="./logout-icon.svg" alt="" />
    </div>
  )
}

export default LogoutButton