import React, { useContext } from 'react'
import { GraphQLClient } from 'graphql-request'
import { GoogleLogin } from 'react-google-login'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { GOOGLE_CLIENT_ID } from '../../config'

import Context from '../../context'
import { ME_QUERY } from '../../graphql/queries'

const Login = ({ classes }) => {
  const { dispatch } = useContext(Context)

  const onFailure = err => {
    console.error('Error loging in', err)
  }

  const onSuccess = async googleUser => {
    try {
      const idToken = googleUser.getAuthResponse().id_token
      const client = new GraphQLClient('http://localhost:4000/graphql/', {
        headers: {
          authorization: idToken,
        },
      })
      const { me } = await client.request(ME_QUERY)
      console.log('TCL: Login -> me', me)
      dispatch({
        type: 'LOGIN_USER',
        payload: me,
      })
    } catch (err) {
      onFailure(err)
    }
  }

  return (
    <div className={classes.root}>
      <Typography
        component="h1"
        variant="h3"
        gutterBottom
        noWrap
        style={{ color: 'rgb(66, 133, 244)' }}
      >
        Welcome
      </Typography>
      <GoogleLogin
        clientId={GOOGLE_CLIENT_ID}
        onSuccess={onSuccess}
        onFailure={onFailure}
        isSignedIn={true}
        theme="dark"
      />
    </div>
  )
}

const styles = {
  root: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
}

export default withStyles(styles)(Login)
