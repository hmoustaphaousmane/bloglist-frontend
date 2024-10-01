import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import Blog from './Blog'

test('renders title and author, but not url or number of likes by default', () => {
  const blog = {
    title: 'blog component testing',
    author: 'vitest',
    url: 'vitest.com',
    likes: 0
  }

  render(<Blog blogToView={blog} />)

  const titleElement = screen.findByText('blog component testing')
  expect(titleElement).toBeDefined()

  const authorElement = screen.findByText('vitest')
  expect(authorElement).toBeDefined()

  const urlElement = screen.queryByText('vitest.com')
  expect(urlElement).toBeNull()

  const likesElement = screen.queryByText(0)
  expect(likesElement).toBeNull()
})

test('clicking the view button show url and number of likes', async () => {
  const blog = {
    title: 'blog component testing',
    author: 'vitest',
    url: 'vitest.com',
    likes: 0
  }

  const mockHandler = vi.fn()

  render(<Blog blogToView={blog} onView={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1) // ⚠️

  const urlElement = screen.findByText('vitest.com')
  expect(urlElement).toBeDefined()

  const likesElement = screen.findByText(0)
  expect(likesElement).toBeDefined()
})

test('ensure that if the like button is clicked twice, the event handler is called twice', async () => {
  const blog = {
    title: 'blog component testing',
    author: 'vitest',
    url: 'vitest.com',
    likes: 0
  }

  const mockHandler = vi.fn()

  render(<Blog blogToView={blog} onLike={mockHandler} />)

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2) // ⚠️
})
