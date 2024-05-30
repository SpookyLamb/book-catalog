import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import { useContext, useState, useEffect } from "react"
import { AuthContext } from "./authContext"
import { getBooks, createBook } from "./api"

function BookItem(props) {
    //needs to have the following: title, author, genre, favorite status, user rating
    //needs to also have buttons to edit and delete the book from the list
    
    const { auth } = useContext(AuthContext)
    const [title, setTitle] = useState(props.title)
    const [author, setAuthor] = useState(props.author)
    const [genre, setGenre] = useState(props.genre)
    const [favorite, setFavorite] = useState(props.favorite)
    const [rating, setRating] = useState(props.rating)

    const setBooks = props.setBooks //set books function

    function submit() {
        if (title && author && genre) {
            console.log(auth)
            createBook({ auth, setBooks, title, author, genre })
        } else {
            alert("A book requires a book, author, and genre!")
            return
        }
    }

    return (
        <Row>
            <Col className="col-3">
                <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
            </Col>
            <Col className="col-2">
                <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                />
            </Col>
            <Col className="col-2">
                <input
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                />
            </Col>
            <Col className="col-1 d-flex justify-content-center">
                <input
                type="checkbox"
                value={favorite}
                onChange={(e) => setFavorite(e.target.value)}
                />
            </Col>
            <Col className="col-2">
                <input
                type="number"
                value={rating}
                onChange={(e) => {
                    let value = e.target.value
                    if (value > 5) {
                        value = 5
                    } else if (value < 0) {
                        value = 0
                    }
                    setRating(value)
                }}
                />
            </Col>
            <Col className="col-2">
                <button onClick={() => {submit()}} >
                    Submit
                </button>
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
                setBooks={setBooks}
            />
        )
    }

    function addBook() {
        let booksCopy = structuredClone(books)
        
        //add a new, blank/default book
        booksCopy["new"] = { //uses a fixed "new" key instead of a number key, only allows one "new" book at a time, this is changed when the book submits
            title: "",
            author: "",
            genre: "",
            favorite: false,
            user_rating: 0,
        } 

        setBooks(booksCopy)
    }

    return (
        <Container className="p-5">
            <button onClick={() => { addBook() }}>
                ADD NEW BOOK
            </button>
            {bookList}
        </Container>
    )
}

export default Catalog