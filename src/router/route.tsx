import * as React from 'react'
import { Suspense } from 'react'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { rootRouter } from 'router/routeConfig'
const RouterConfig = () => {
  return (
    <Router>
      <Suspense fallback={<div className="loader">
        <div className="loader-inner">
          {
            [1,2,3,4, 5].map(item => (
              <div className="loader-line-wrap" key={ item }>
                <div className="loader-line"></div>
              </div>
            ))
          }
        </div>
      </div>}>
        <Switch>
          {
            rootRouter.map((route, i) => (
              route.redirect 
              ? <Redirect key={route.path || i} to={ route.to } from={ route.from }></Redirect> 
              : <Route key={route.path || i} path={ route.path } component={ route.component }></Route>
            ))
          }
        </Switch>
      </Suspense>
    </Router>
  )
}
export default RouterConfig
