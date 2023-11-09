import universalCookie from 'universal-cookie'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

import { usersAttributes, loginData } from '../../service/authApi'
import { setAccessToken } from '../../store/authSlice'

const cookie = new universalCookie()

const SignIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState<usersAttributes>({
    username: '',
    password: '',
    access_token: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await loginData(formData)

    if (response.result && response.result.accessToken) {
      dispatch(setAccessToken(response.result.accessToken))

      cookie.set('accessToken', response.result.accessToken, { path: '/' })

      toast.success(response.message)

      navigate(response.result.path)
    } else {
      toast.error(response.message)
    }
  }

  return (
    <div className="main-wrapper">
      <div className="account-content">
        <div className="container py-4">
          {/* /Account Logo */}
          <div className="account-box my-5">
            <div className="account-wrapper">
              <h3 className="account-title">Login</h3>
              <p className="account-subtitle">Access to our dashboard</p>
              {/* Account Form */}
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label>Username</label>
                  <input
                    className="form-control"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col">
                      <label>Password</label>
                    </div>
                  </div>
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group text-center">
                  <button className="btn btn-primary account-btn" type="submit">
                    Login
                  </button>
                </div>
              </form>
              {/* /Account Form */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
