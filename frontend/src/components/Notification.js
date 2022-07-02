import { React, useState, forwardRef, useImperativeHandle } from 'react'

const Notification = forwardRef((_,ref) => {
  const [type, setType] = useState('')
  const [message, setMessage] = useState('')

  const displayErrorNotification = (message) => {
    setType('error')
    displayNotification(message)
  }

  const displayInfoNotification = (message) => {
    setType('info')
    displayNotification(message)
  }

  const displayNotification = (message) => {
    setMessage(message)

    setTimeout(() => {
      setType('')
      setMessage('')
    }, 5000)
  }

  useImperativeHandle(ref, () => {
    return {
      displayErrorNotification,
      displayInfoNotification
    }
  })

  const selectNotificationStyle = () => {
    switch (type) {
    case 'error':
      return {
        color: 'red',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '20px'
      }
    case 'info':
      return {
        color: 'green',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '20px'
      }
    default:
      return {
        display: 'none'
      }
    }
  }


  return <div className="notification" style={selectNotificationStyle()}>{message}</div>
})

Notification.displayName = 'Notification'

export default Notification
