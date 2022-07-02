import React from 'react'
import PropTypes from 'prop-types'

const LoginDetails = ({ user, handleLogout }) => (
  <p>
    {user.name} logged in
    <button onClick={handleLogout}>logout</button>
  </p>
)

LoginDetails.propTypes = {
  user: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired
}

export default LoginDetails