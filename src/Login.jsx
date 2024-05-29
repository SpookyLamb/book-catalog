import { useContext, useState } from "react"
import { AuthContext } from "./authContext"
import { createUser, getToken } from "./api"

function CreateUser() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const submit = () => {
    createUser({username, password, firstName, lastName})
  }

  return (
    <div>
      <h1>Register</h1>
      <div>
        <div>Username:</div>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div>Password:</div>
        <input
          //type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>First Name:</div>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <div>Last Name:</div>
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <div style={{marginTop: 20}}>
        <button onClick={() => submit()}>Submit</button>
      </div>
    </div>
  )
}

function Login() {
  const { auth } = useContext(AuthContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submit = () => {
    getToken({auth, username, password})
  }

  return (
    <div className="p-5">
      <h1>Login</h1>
      <div>
        <div>Username:</div>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div>Password:</div>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div style={{marginTop: 20}}>
        <button onClick={() => submit()}>Submit</button>
      </div>

      <hr></hr>

      <CreateUser/>

    </div>
  )
}

export default Login
