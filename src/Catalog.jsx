import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import { TextField } from "@mui/material"
import { Button } from "@mui/material"
import { IconButton } from "@mui/material"
import { Rating } from "@mui/material"

import { Book } from "@mui/icons-material"
import { Send } from "@mui/icons-material"
import { Delete } from "@mui/icons-material"

import { useContext, useState, useEffect } from "react"
import { AuthContext } from "./authContext"
import { getBooks, createBook, editBook, deleteBook } from "./api"

function BookItem(props) {
    //needs to have the following: title, author, genre, favorite status, user rating
    //needs to also have buttons to edit and delete the book from the list
    
    //console.log(typeof props.favorite, props.favorite) //uncomment this and below to witness the dumbest bug ever

    const { auth } = useContext(AuthContext)
    const [title, setTitle] = useState(props.title)
    const [author, setAuthor] = useState(props.author)
    const [genre, setGenre] = useState(props.genre)
    const [favorite, setFavorite] = useState(props.favorite)
    const [rating, setRating] = useState(props.rating)

    //console.log(typeof favorite, favorite) //uncomment this and above to witness the dumbest bug ever

    const id = props.id
    const setBooks = props.setBooks //set books function

    function submit() {
        if (title && author && genre) {

            let fixedFavorite //a fix for the DUMBEST bug I have EVER witnessed, I swear to god
            if (favorite === "true") {
                fixedFavorite = true
            } else if (favorite === "false") {
                fixedFavorite = false
            } else {
                fixedFavorite = favorite
            }

            if (id !== "new") {
                editBook({ auth, setBooks, id, title, author, genre, favorite: fixedFavorite, rating }) //edit a book by id
            } else {
                createBook({ auth, setBooks, title, author, genre, favorite: fixedFavorite, rating }) //create a new book
            }
        } else {
            alert("A book requires a book, author, and genre!")
            return
        }
    }

    function deleteBookItem() {
        deleteBook( {auth, setBooks, id} )
    }

    return (
        <Row className="py-2">
            <Col className="col-4">
                <TextField
                variant="standard"
                className="inputty"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
            </Col>
            <Col className="col-2">
                <TextField
                variant="standard"
                className="inputty"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                />
            </Col>
            <Col className="col-2">
                <TextField
                variant="standard"
                className="inputty"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                />
            </Col>
            <Col className="col-1 d-flex justify-content-center">
                <input
                type="checkbox"
                checked={favorite}
                value={favorite}
                onChange={(e) => {
                    setFavorite(!favorite)
                }}
                />
            </Col>
            <Col className="col-1 d-flex justify-content-center">
                <Rating
                className="my-auto"
                defaultValue={0}
                precision={1}
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
            <Col className="col-1 text-end">
                <IconButton variant="contained" color="success" onClick={() => {submit()}} >
                    <Send />
                </IconButton>
            </Col>
            <Col className="col-1 text-start">
                <IconButton variant="contained" color="error" onClick={() => {deleteBookItem()}} >
                    <Delete />
                </IconButton>
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
        let bookID = book.id
        
        if (bookID !== "new") {
            bookID = Number(bookID)
        }

        bookList.push(
            <BookItem 
                id={bookID}
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
            id: "new",
            title: "",
            author: "",
            genre: "",
            favorite: false,
            user_rating: 0,
        } 

        setBooks(booksCopy)
    }

    return (
        <div className="py-5">
            <Container className="p-5 pt-1 border catalog foreground-box">
                <h1 className="text-center pt-3">Your Catalog</h1>
                <Col className="text-center p-2 pb-3">
                    <Button variant="contained" size="large" startIcon={<Book/>} endIcon={<Book/>} onClick={() => { addBook() }}>
                            ADD NEW BOOK
                    </Button>
                </Col>
                <Row className="text-center">
                    <Col className="col-4">
                        Book Title
                    </Col>
                    <Col className="col-2">
                        Author
                    </Col>
                    <Col className="col-2">
                        Genre
                    </Col>
                    <Col className="col-1">
                        Favorite?
                    </Col>
                    <Col className="col-1">
                        Rating
                    </Col>
                    <Col className="col-2">
                        Actions
                    </Col>
                </Row>
                {bookList}
            </Container>
        </div>
    )
}

export default Catalog