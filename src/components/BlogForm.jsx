import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addNote = (event) => {
    event.preventDefault()
    console.log('event target value', title, author, url)
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={addNote}>
        <div>
          title: <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
            placeholder='wirte your bolg title here'
          />
        </div>
        <div>
          author: <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
            placeholder='write blogs author here'
          />
        </div>
        <div>
          url: <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
            placeholder='write blog url here'
          />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm