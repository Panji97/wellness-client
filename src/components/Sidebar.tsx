import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const location = useLocation()
  const { pathname } = location

  const [activeMenu, setActiveMenu] = useState(null)

  const userData = useSelector((state: any) => state.user.data)

  const toggleMenu = (menuName: any) => {
    if (activeMenu === menuName) {
      setActiveMenu(null)
    } else {
      setActiveMenu(menuName)
    }
  }

  useEffect(() => {
    setActiveMenu(null)
  }, [pathname])

  return (
    <div className="sidebar" id="sidebar">
      <div className="sidebar-inner slimscroll">
        <div id="sidebar-menu" className="sidebar-menu">
          <ul>
            {userData.menus ? (
              userData.menus.map((header: any) => (
                <li className={`submenu ${activeMenu === 'dashboard' ? 'active' : ''}`}>
                  <a href="#" onClick={() => toggleMenu('dashboard')}>
                    <i className={header.icon} /> <span> {header.name}</span> <span className="menu-arrow" />
                  </a>
                  <ul
                    style={{
                      display: activeMenu === 'dashboard' ? 'block' : 'none'
                    }}
                  >
                    {header.child.map((children: any) => (
                      <li>
                        <NavLink to={children.link} style={{ textDecoration: 'none', color: 'white' }}>
                          Admin {children.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
              ))
            ) : (
              <li className="submenu ml-2">No data</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
