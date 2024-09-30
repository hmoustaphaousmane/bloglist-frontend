import { useState } from 'react'

const Togglable = (props) => {
  const [visibility, setVisibility] = useState(false)

  const hideVisibility = { display: visibility ? 'none' : '' }
  const showVisibility = { display: visibility ? '' : 'none' }

  const toggleVisibility = () =>
    setVisibility(!visibility)

  return (
    <div>
      <div style={hideVisibility}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showVisibility}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

export default Togglable
