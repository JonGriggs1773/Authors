import axios from 'axios'
import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'

const List = () => {
    const [authorList, setAuthorList] = useState([])
    const navigate = useNavigate()

    useEffect(() => {axios.get("http://localhost:8000/api/authors")
        .then((res) => {
            console.log("Response:", res.data.authors)
            setAuthorList(res.data.authors)
        })
        .catch((err) => {
            console.log(err)
        })
    }, []) 

    //* For this callback function, a is the first object (index 0), and b is the second object (index1)
    //* It compares the object attributes with each other using the localeCompare() built in function
    //* Then moves down the list of objects again and again until it can't make anymore changes to the list
    //* localeCompare returns -1 (before), 0 (equal), or 1 (after)
    const sortAlphabeticallyAZ = () => {
        setAuthorList(authorList.sort((a, b) => a._name.localeCompare(b._name)))
        console.log("Check altered state!!!!!!")
        navigate("/")
    }

    const sortAlphabeticallyZA = () => {
        setAuthorList(authorList.sort((a, b) => b._name.localeCompare(a._name)))
        console.log("Check altered state!!!!!!")
        navigate("/")
    }

    const deleteAuthor = (id) => {
        axios.delete("http://localhost:8000/api/authors/" + id)
        .then(res => {
            console.log("Results from Delete", res.data)
            setAuthorList(authorList.filter(author => author._id !== id))
        })
        .catch(err => console.log(err))
    }



  return (
    <div>
        <div id = "main-container" className = "border border-dark mt-3 px-3">
            <div id = "top" className = "border-bottom border-dark">
                <h1 className = "text text-info">All Authors</h1>
                <button onClick = {sortAlphabeticallyAZ} className = "btn btn-outline-primary">A-Z</button>
                <button onClick = {sortAlphabeticallyZA} className = "btn btn-outline-primary">Z-A</button>
                <a href = "/form" className = "btn btn-dark">Add Author</a>
            </div>
            <table className = "table">
                <thead>
                    <tr>
                        <th scope = "col">#ID</th>
                        <th scope = "col">Author Name</th>
                        <th scope = "col">Created At</th>
                        <th scope = "col">Updated At</th>
                    </tr>
                </thead>
                <tbody>
                {
                    authorList.map((author) => {
                        return(
                            <tr key = {author._id}>
                                <th scope = "row" id = {author._id}>{author._id}</th>
                                <td>{author._name}</td>
                                <td>{author.createdAt}</td>
                                <td>{author.updatedAt}</td>
                                <td><a href = {`/update/${author._id}`} className = "btn btn-outline-warning">Edit</a></td>
                                <td><button onClick = {() => deleteAuthor(author._id)} className = "btn btn-outline-danger">Delete</button></td>
                            </tr>
                            )})
                }
                </tbody>
            </table>
            
        </div>
    </div>
  )
}

export default List