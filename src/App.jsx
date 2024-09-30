import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  // const [loginVisible, setLoginVisible] = useState(false)
  const [blogVisible, setBlogVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      console.log(sortedBlogs)
      setBlogs(sortedBlogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      // keep the user present in the browser's local storage logged in
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    // console.log('login with:', username, password)
    try {
      const user = await loginService.login({
        username, password
      })
      // console.log(user)

      // save user to local storage
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMessage('worng username or password')
      setNotificationType('error')
      setTimeout(() => {
        setNotificationMessage(null)
        setNotificationType(null)
      }, 5000)
    }
  }

  const logout = () => {
    // logout by removing the logged user from the local storage
    window.localStorage.removeItem('loggedBlogappUser')
    // logout by emptying completely the local storage
    // window.localStorage.clear()

    setUser(null)
  }

  const addBlog = (newObject) => {
    blogService
      .create(newObject)
      .then(returnedBlog => {
        console.log(returnedBlog)
        setBlogs(blogs.concat(returnedBlog))
        setTitle('')
        setAuthor('')
        setUrl('')
      })
    setBlogVisible(false)

    setNotificationMessage(`a new blog ${newObject.title} by ${newObject.author} added`)
    setNotificationType('success')
    setTimeout(() => {
      setNotificationMessage(null)
      setNotificationType(null)
    }, 5000)
  }

  // const loginForm = () => {
  //   const hideVisibility = { display: loginVisible ? 'none' : '' }
  //   const showVisibility = { display: loginVisible ? '' : 'none' }

  //   return (
  //     <div>
  //       <div style={hideVisibility}>
  //         <button onClick={() => setLoginVisible(true)}>log in</button>
  //       </div>
  //       <div style={showVisibility}>
  //         <LoginForm
  //           username={username}
  //           password={password}
  //           handleUsernameChange={({ target }) => setUsername(target.value)}
  //           handlePasswordChange={({ target }) => setPassword(target.value)}
  //           handleSubmit={handleLogin}
  //         />
  //         <button onClick={() => setLoginVisible(false)}>cancel</button>
  //       </div>
  //     </div>
  //   )
  // }

  const blogForm = () => {
    const hideVisibility = { display: blogVisible ? 'none' : '' }
    const showVisibility = { display: blogVisible ? '' : 'none' }
    return (
      <div>
        <div style={hideVisibility}>
          <button onClick={() => setBlogVisible(true)}>create new blog</button>
        </div>
        <div style={showVisibility}>
          <BlogForm
            createBlog={addBlog}
          />
          <button onClick={() => setBlogVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>

      <Notification
        message={notificationMessage}
        type={notificationType}
      />
      {/* {!user && loginForm()} */}
      {!user && <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
      }
      {user && <div>
        <p>{user.name} logged in <button onClick={logout} type='submit'>logout</button></p>

        {blogForm()}

        {
          blogs.map(blog =>
            <Blog key={blog.id} blogToView={blog} />
          )
        }
      </div>
      }
    </div>
  )
}

export default App