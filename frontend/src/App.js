import React, { useState, useEffect, useRef } from 'react'

import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import LoginDetails from './components/LoginDetails'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

function App() {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const blogFormToggleRef = useRef()
  const notificationRef = useRef()

  useEffect(async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)

    } catch (exception) {
      notificationRef.current.displayErrorNotification(exception.response.data.error)
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogappUser')

    setUser(null)

    notificationRef.current.displayInfoNotification('you have logged out')
  }

  const createBlog = async (newBlog) => {
    try {
      const savedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(savedBlog))

      blogFormToggleRef.current.toggleVisibility()
      notificationRef.current.displayInfoNotification(`a new blog ${savedBlog.title} by ${savedBlog.author} added`)

    } catch (exception) {
      notificationRef.current.displayErrorNotification(exception.response.data.error)
    }
  }

  const incrementBlogLikes = async (blogToUpdate) => {
    try {
      blogToUpdate.likes += 1

      const updatedBlog = await blogService.update(blogToUpdate.id, blogToUpdate)
      setBlogs(blogs.map(blog => updatedBlog.id !== blog.id ? blog : updatedBlog))

    } catch (exception) {
      notificationRef.current.displayErrorNotification(exception.response.data.error)
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
    } catch (exception) {
      notificationRef.current.displayErrorNotification(exception.response.data.error)
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification ref={notificationRef} />
      {user === null &&
        <LoginForm handleLogin={handleLogin} />
      }
      {user !== null &&
        <>
          <LoginDetails
            user={user}
            handleLogout={() => handleLogout()}
          />
          <Togglable buttonLabel="new note" ref={blogFormToggleRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
          <Blogs
            blogs={blogs}
            incrementBlogLikes={incrementBlogLikes}
            deleteBlog={deleteBlog}
            loggedInUser={user}
          />
        </>
      }
    </div>
  )
}

export default App
