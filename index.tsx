import * as ReactDOM from 'react-dom'
import * as React from 'react'
import "common/css/home.less"
import App from './App'

const render = () => {
  ReactDOM.render(
    <App/>,
    document.querySelector('#app')
  )
}

render()



