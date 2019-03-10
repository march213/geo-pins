import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'

import Context from './context'

export default ({ component: Component, ...rest }) => {
  const { state } = useContext(Context)
  return (
    <Route
      render={props => (!state.isAuth ? <Redirect to="/login" /> : <Component {...props} />)}
      {...rest}
    />
  )
}
