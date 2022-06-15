import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import 'src/assets/css/style.css'
import { useSelector } from 'react-redux'
import { privateRoutes, publicRouters } from './router'

function App() {
  const isUser = useSelector((state) => !!state.token)
  const activeRoutes = isUser ? privateRoutes : publicRouters

  function RouteWithSubRoutes(route) {
    return (
      <Route
        path={route.path}
        exact={route.exact}
        render={(props) => (
          // pass the sub-routes down to keep nesting
          <route.component {...props} routes={route.routes} />
        )}
      />
    )
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          {activeRoutes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
          <Redirect to={isUser ? '/product/' : '/auth/sign-in/'}>
            <div>
              <h1>Страница не найдена</h1>
            </div>
          </Redirect>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
