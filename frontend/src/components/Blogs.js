import React from 'react'
import Blog from './Blog'
import PropTypes from 'prop-types'

const Blogs = ({ blogs, incrementBlogLikes, deleteBlog, loggedInUser }) => (
  <>
    {
      blogs
        .sort((a,b) => a.likes > b.likes ? -1 : 1)
        .map((blog) =>
          <Blog
            key={blog.id}
            blog={blog}
            incrementBlogLikes={incrementBlogLikes}
            deleteBlog={deleteBlog}
            loggedInUser={loggedInUser} />
        )
    }
  </>
)

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  incrementBlogLikes: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  loggedInUser: PropTypes.object.isRequired
}

export default Blogs