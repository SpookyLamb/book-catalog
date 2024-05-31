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

import { v4 as uuidv4 } from 'uuid';

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
            <Col className="col-3">
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
            <Col className="col-2 d-flex justify-content-center">
                <Rating
                className="my-auto"
                defaultValue={0}
                precision={1}
                value={rating}
                onChange={(e) => {
                    let value = e.target.value
                    console.log(value)

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
    const [sortOrder, setSortOrder] = useState("")

    useEffect(() => {
        getBooks({ auth, setBooks })
    }, [])

    let keys = Object.keys(books)
    let bookList = []

    if (sortOrder) { //anything other than an empty string
        //takes the sort order and sorts the keys array (and therefore the draw order) based on what it finds

        //done by constructing the following: 
        //  an object containing the keys AS VALUES and the desired sorting data as the keys, for reference
        //  an array of the desired sorting data, which is sorted

        let obj = {}
        let ref = []

        switch (sortOrder) {
            case "title":
                for (const key of keys) {
                    const book = books[key]
                    const title = book.title
                    ref.push(title)
                    obj[title] = key
                }
                break;
            case "author":
                for (const key of keys) {
                    const book = books[key]
                    const author = book.author
                    ref.push(author)
                    obj[author] = key
                }
                break;
            case "genre":
                for (const key of keys) {
                    const book = books[key]
                    const genre = book.genre
                    ref.push(genre)
                    obj[genre] = key
                }
                break;
            default: //ignore
                break;
        }

        ref.sort() //sort our array
        let new_keys = []

        for (const key of ref) {
            new_keys.push(obj[key]) //push our old keys back into the sorted order
        }

        keys = new_keys //set our new order
        console.log(keys)
    }

    for (let i = 0; i < keys.length; i++) {
        let book = books[keys[i]]
        let bookID = book.id
        
        if (bookID !== "new") {
            bookID = Number(bookID)
        }

        bookList.push(
            <BookItem 
                id={bookID}
                key={uuidv4()}
                title={book.title}
                author={book.author}
                genre={book.genre}
                favorite={book.favorite}
                rating={book.user_rating}
                setBooks={setBooks}
            />
        )

        console.log(bookList)
    }

    function addBook() {
        let booksCopy = structuredClone(books)
        
        //add a new, blank/default book
        booksCopy["new"] = { //uses a fixed "new" key instead of a number key, only allows one "new" book at a time, this is changed when the book submits
            id: "new",
            key: uuidv4(),
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
            <Container className="p-5 pt-1 my-border catalog foreground-box">
                <h1 className="text-center pt-3">Your Catalog</h1>
                <Col className="text-center p-2 pb-3">
                    <Button variant="contained" size="large" startIcon={<Book/>} endIcon={<Book/>} onClick={() => { addBook() }}>
                            ADD NEW BOOK
                    </Button>
                </Col>
                <Row className="text-center">
                    <Col className="col-3">
                        <Button variant="text" onClick={() => setSortOrder("title")}>
                            Book Title
                        </Button>
                    </Col>
                    <Col className="col-2">
                        <Button variant="text" onClick={() => setSortOrder("author")}>
                            Author
                        </Button>
                    </Col>
                    <Col className="col-2">
                        <Button variant="text" onClick={() => setSortOrder("genre")}>
                            Genre
                        </Button>
                    </Col>
                    <Col className="col-1">
                        Favorite?
                    </Col>
                    <Col className="col-2">
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