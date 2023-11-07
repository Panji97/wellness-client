import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

import Loader from './common/Loader'
import routes from './routes'

const Login = lazy(() => import('./pages/Authentication/SignIn'))

function App() {
  return (
    <Routes>
      <Route index path="/" element={<Login />} />
      {routes.map((routes, index) => {
        const { path, component: Component } = routes
        return (
          <Route
            key={index}
            path={path}
            element={
              <Suspense fallback={<Loader />}>
                <Component />
              </Suspense>
            }
          />
        )
      })}
    </Routes>
  )
}

export default App
