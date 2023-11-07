import { useSelector } from 'react-redux'

const Greetings = () => {
  const userData = useSelector((state: any) => state.user.data)
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="welcome-box">
          <div className="welcome-img">
            <img alt="" src="assets/img/profiles/avatar-02.jpg" />
          </div>
          <div className="welcome-det">
            <h3>Welcome, {userData.username}</h3>
            <p>{userData.company}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Greetings
