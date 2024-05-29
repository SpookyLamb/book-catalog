import { useState } from "react"
import { useContext } from "react"
import { AuthContext } from "./authContext"
import { fetchUser } from "./api"
import Login from "./Login"

function App() {
  const {auth} = useContext(AuthContext)
  const [pageData, setPageData] = useState([
    <Login />
  ])

  if (auth.accessToken.length > 0) { //existing access token, bring up our book list
    return (
      <div>Logged In</div>
    )
  } else { //otherwise, invalid access token, bring up the login page by default
    return (
      <Login />
    )
  }
}

export default App
