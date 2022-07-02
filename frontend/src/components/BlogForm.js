import { React, useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleCreateBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
        title:
          <input
            type="text"
            value={newTitle}
            name="title"
            id="input-title"
            onChange={({ target }) => setNewTitle(target.value)}
            required
          />
        </div>
        <div>
        author:
          <input
            type="text"
            value={newAuthor}
            name="author"
            id="input-author"
            onChange={({ target }) => setNewAuthor(target.value)}
            required
          />
        </div>
        <div>
        url:
          <input
            type="text"
            value={newUrl}
            name="url"
            id="input-url"
            onChange={({ target }) => setNewUrl(target.value)}
            required
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm