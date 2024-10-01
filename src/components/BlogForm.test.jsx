import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import { expect, test, vi } from 'vitest'

test('<BlogForm /> calls the event handler it received as props with rigth details', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  // find input fields
  const titleInput = screen.getByPlaceholderText('wirte your bolg title here')
  const authorInput = screen.getByPlaceholderText('write blogs author here')
  const urlInput = screen.getByPlaceholderText('write blog url here')

  // create button
  const sendButton = screen.getByText('create')

  // fill the form
  await user.type(titleInput, 'testing blog title')
  await user.type(authorInput, 'testing blog author')
  await user.type(urlInput, 'testing.blog.url')

  // submit the form
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)

  // expect(createBlog.mock.calls[0][0].title).toBe('testing blog title')
  // expect(createBlog.mock.calls[0][0].author).toBe('testing blog author')
  // expect(createBlog.mock.calls[0][0].url).toBe('testing.blog.url')

  // an equivalent to all three commented expect above
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'testing blog title',
    author: 'testing blog author',
    url: 'testing.blog.url'
  })
})