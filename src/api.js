import axios from 'axios'

const baseUrl = 'http://127.0.0.1:8000'

export const createUser = ({username, password, email, firstName, lastName}) => {
    axios({
        method: 'post',
        url: `${baseUrl}/create-user/`,
        data: {
            username,
            password,
            email,
            first_name: firstName,
            last_name: lastName,
        }
    }).then(response => {
        console.log("CREATE USER RESPONSE: ", response)
    }).catch(error => console.log('ERROR: ', error))
}

export const getToken = ({ auth, username, password }) => {
    axios.post(`${baseUrl}/token/`, {
        username,
        password,
    }).then(response => {
        console.log("GET TOKEN RESPONSE: ", response)
        auth.setAccessToken(response.data.access)
    }).catch(error => console.log("ERROR: ", error))
}

export const fetchUser = ({ auth }) => {
    axios({
        method: 'get',
        url: `${baseUrl}/profile/`,
        headers: {
            Authorization: `Bearer ${auth.accessToken}`
        },
    }).then(response => {
        console.log('FETCH USER RESPONSE: ', response)
    }).catch(error => console.log("ERROR: ", error))
}

export const getBooks = ({ auth, setBooks }) => {
    axios({
        method: 'get',
        url: `${baseUrl}/get-books/`,
        headers: {
            Authorization: `Bearer ${auth.accessToken}`
        },
    }).then(response => {
        console.log("FETCH BOOKS RESPONSE: ", response)
        setBooks(response.data)
    }).catch(error => {
        console.log("ERROR: ", error)
    })
}