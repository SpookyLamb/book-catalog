import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import { useContext, useState, useEffect } from "react"
import { AuthContext } from "./authContext"
import { getBooks } from "./api"

function BookItem(props) {
    //needs to have the following: title, author, genre, favorite status, user rating
    //needs to also have buttons to edit and delete the book from the list
    
    const title = props.title
    const author = props.author
    const genre = props.genre
    const favorite = props.favorite
    const rating = props.rating

    return (
        <Row>
            <Col>
                {title}
            </Col>
            <Col>
                {author}
            </Col>
            <Col>
                {genre}
            </Col>
            <Col>
                {String(favorite)}
            </Col>
            <Col>
                {rating}
            </Col>
        </Row>
    )
}

function Catalog() {
    //needs to be a list of books, using the BookItem component
    const { auth } = useContext(AuthContext)
    const [books, setBooks] = useState({})

    useEffect(() => {
        getBooks({ auth, setBooks })
    }, [])

    let keys = Object.keys(books)
    let bookList = []

    for (let i = 0; i < keys.length; i++) {
        let book = books[keys[i]]
        bookList.push(
            <BookItem 
                title={book.title}
                author={book.author}
                genre={book.genre}
                favorite={book.favorite}
                rating={book.user_rating}
            />
        )
    }

    return (
        <Container className="p-5">
            <BookItem 
                title="Title"
                author="Author"
                genre="Genre"
                favorite={false}
                rating={0}
            />
            {bookList}
        </Container>
    )
}

export default Catalog