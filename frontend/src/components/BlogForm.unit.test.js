import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('with create blog form data correctly populated', () => {
  test('create blog event handler receives correct form data on submit', () => {
    const mockCreateBlog = jest.fn()

    const { container } = render(
      <BlogForm
        createBlog={mockCreateBlog} />
    )

    const inputTitle = container.querySelector('#input-title')
    const inputAuthor = container.querySelector('#input-author')
    const inputUrl = container.querySelector('#input-url')
    const createButton = screen.getByText('create')

    userEvent.type(inputTitle, 'Test Title')
    userEvent.type(inputAuthor, 'Test Author')
    userEvent.type(inputUrl, 'www.test.test')
    userEvent.click(createButton)

    expect(mockCreateBlog.mock.calls).toHaveLength(1)
    expect(mockCreateBlog.mock.calls[0][0]).toMatchObject({
      title: 'Test Title',
      author: 'Test Author',
      url: 'www.test.test'
    })

    expect(inputTitle).toHaveTextContent('')
    expect(inputAuthor).toHaveTextContent('')
    expect(inputUrl).toHaveTextContent('')
  })
})