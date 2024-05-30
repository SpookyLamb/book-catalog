import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import { useContext, useState } from "react"
import { AuthContext } from "./authContext"
import { createUser, getToken } from "./api"

function CreateUser() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConf, setPasswordConf] = useState('')
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const submit = () => {
      if (password.length < 8) {
        alert("Your password must be at least 8 characters long!")
        return
      }
  
      if (password !== passwordConf) {
        alert("Passwords didn't match! Please try again.")
        return
      }
  
      createUser({username, password, email, firstName, lastName})
    }
  
    return (
      <div>
        <h2>Register</h2>
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
          <div>Confirm Password:</div>
          <input
            type='password'
            value={passwordConf}
            onChange={(e) => setPasswordConf(e.target.value)}
          />
          <div>Email:</div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

    async function submit() {
      getToken({auth, username, password})
    }

    return (
      <Container className="p-5 text-center border foreground-box">
        <h1 className="text-center p-3 pt-1">Book Catalog Login</h1>
        <h2>Login</h2>
        <Col>
            <div>Username: </div>
            <input
                className="loggedin"
                id="userlogin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
        </Col>
        <Col>
            <div>Password: </div>
            <input
                className="loggedin"
                id="passwordlogin"
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
        </Col>
  
        <div style={{marginTop: 20}}>
            <button onClick={() => submit()}>Submit</button>
        </div>
  
        <hr className=""></hr>
  
        <CreateUser/>
  
      </Container>
    )
}

export default Login