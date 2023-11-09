import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import universalCookie from 'universal-cookie'

import { userLogin } from '../service/userApi'
import { setUser } from '../store/userSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const cookie = new universalCookie()

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userData = useSelector((state: any) => state.user.data)

  const api = async () => {
    const response = await userLogin()

    dispatch(setUser(response.result))
  }

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault()
    cookie.remove('accessToken')

    toast.success('success logout')

    navigate('/')
    window.location.reload()
  }

  useEffect(() => {
    api()
  }, [dispatch])

  return (
    <div className="header">
      {/* Logo */}
      <div className="header-left"></div>
      {/* /Logo */}
      <a id="toggle_btn">
        <span className="bar-icon">
          <span />
          <span />
          <span />
        </span>
      </a>
      {/* Header Title */}

      {/* /Header Title */}
      <a id="mobile_btn" className="mobile_btn" href="#sidebar">
        <i className="fa fa-bars" />
      </a>
      {/* Header Menu */}
      <ul className="nav user-menu">
        <li className="nav-item dropdown has-arrow main-drop">
          <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown">
            <span>{userData ? userData.username : 'unknown'}</span>
          </a>
          <div className="dropdown-menu">
            <a className="dropdown-item">My Profile</a>
            <a className="dropdown-item" onClick={handleLogout}>
              Logout
            </a>
          </div>
        </li>
      </ul>
      {/* /Header Menu */}
      {/* Mobile Menu */}
      <div className="dropdown mobile-user-menu">
        <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
          <i className="fa fa-ellipsis-v" />
        </a>
        <div className="dropdown-menu dropdown-menu-right">
          <a className="dropdown-item">My Profile</a>
          <a className="dropdown-item" onClick={handleLogout}>
            Logout
          </a>
        </div>
      </div>
      {/* /Mobile Menu */}
    </div>
  )
}

export default Header
