import ContentHR from '../../components/ContentHR'
import Greetings from '../../components/Greetings'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'

const Admin = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="page-wrapper">
        <div className="content">
          <Greetings />
          <ContentHR />
        </div>
      </div>
    </>
  )
}

export default Admin
