import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('renders content', () => {
  test('details are hidden by default', () => {
    const blog = {
      title: 'Test Title',
      author: 'Test Author',
      url: 'www.test.test',
      likes: 50
    }

    const mockIncreaseBlogLikes = jest.fn()
    const mockDeleteBlog = jest.fn()

    const { container } = render(
      <Blog
        blog={blog}
        incrementBlogLikes={mockIncreaseBlogLikes}
        deleteBlog={mockDeleteBlog}
        loggedInUser={{}} />
    )

    const overviewDiv = container.querySelector('.blogOverview')
    expect(overviewDiv).toHaveTextContent('Test Title')
    expect(overviewDiv).toHaveTextContent('Test Author')

    const detailsDiv = container.querySelector('.blogDetails')
    expect(detailsDiv).toBeNull()
  })

  test('details displayed when show button is clicked', () => {
    const blog = {
      title: 'Test Title',
      author: 'Test Author',
      url: 'www.test.test',
      likes: 50
    }

    const mockIncreaseBlogLikes = jest.fn()
    const mockDeleteBlog = jest.fn()

    const { container } = render(
      <Blog
        blog={blog}
        incrementBlogLikes={mockIncreaseBlogLikes}
        deleteBlog={mockDeleteBlog}
        loggedInUser={{}} />
    )

    const button = screen.getByText('Show')
    userEvent.click(button)

    const overviewDiv = container.querySelector('.blogOverview')
    expect(overviewDiv).toHaveTextContent('Test Title')
    expect(overviewDiv).toHaveTextContent('Test Author')

    const detailsDiv = container.querySelector('.blogDetails')
    expect(detailsDiv).toHaveTextContent('www.test.test')
    expect(detailsDiv).toHaveTextContent('likes 50')
  })

  test('increase likes function is called twice, if the like button is clicked twice', () => {
    const blog = {
      title: 'Test Title',
      author: 'Test Author',
      url: 'www.test.test',
      likes: 50
    }

    const mockIncreaseBlogLikes = jest.fn()
    const mockDeleteBlog = jest.fn()

    render(
      <Blog
        blog={blog}
        incrementBlogLikes={mockIncreaseBlogLikes}
        deleteBlog={mockDeleteBlog}
        loggedInUser={{}} />
    )

    const button = screen.getByText('Show')
    userEvent.click(button)

    const likeButton = screen.getByText('like')
    userEvent.click(likeButton)
    userEvent.click(likeButton)

    expect(mockIncreaseBlogLikes.mock.calls).toHaveLength(2)
  })
})
