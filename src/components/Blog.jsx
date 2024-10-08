import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blogToView, onView, onLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginTop: 2.5,
    marginBottom: 2.5
  }

  const [blog, setBlog] = useState(blogToView)
  const [detailsVisible, setDetailsVisible] = useState(false)

  const loggedinUser = JSON.parse(
    window.localStorage.getItem('loggedBlogappUser')
  )

  const handleLikes = (event) => {
    event.preventDefault()
    console.log('blog before incrementing likes', blog)

    const newObject = {
      ...blog, // spread existing blog properties
      likes: blog.likes + 1,
    }


    blogService
      .update(blog.id, newObject)
      .then(returnedBlog => {
        console.log('blog after incrementing likes', returnedBlog)
        setBlog(returnedBlog)
      })
  }

  const handleRemove = () => {
    if (confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      // console.log('removing blog:', blog.id)
      blogService.remove(blog.id)
      setBlog(null)
    }
  }

  if (blog === null) return null

  return (
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author} &nbsp;
      {
        !detailsVisible &&
        <button
          onClick={() => {
            setDetailsVisible(true)
            if (onView) onView() // Call the mockHandler when the view button is clicked
          }}
        >view</button>
      }
      {
        detailsVisible &&
        <>
          <button onClick={() => setDetailsVisible(false)}>hide</button>
          <div>
            {blog.url} <br />
            {blog.likes} <button onClick={(event) => {
              if (onLike) onLike() // Call the mockHandler when the view button is clicked
              else handleLikes(event)
            }}
            >like</button><br />
          </div>
          {/* display "remove" button only if the logged-in user is the blog owner */}
          {
            blog.user && loggedinUser && blog.user.username === loggedinUser.username &&
            blog.user.name === loggedinUser.name && (
              <button className="remove" onClick={handleRemove}>remove</button>
            )
          }
        </>
      }
    </div >
  )
}

export default Blog
