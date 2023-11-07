import ContentVendor from '../../components/ContentVendor'
import Greetings from '../../components/Greetings'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'

const Vendor = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="page-wrapper">
        <div className="content">
          <Greetings />
          <ContentVendor />
        </div>
      </div>
    </>
  )
}

export default Vendor
