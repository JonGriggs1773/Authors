import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const AuthorForm = () => {
    const [_name, setName] = useState("")
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    const formValidator = () => {
        let isValid = true
        if(_name.length < 3) {
            isValid = false
        }
        return isValid
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/authors", {
            _name: _name
        })
        .then(res => {
            navigate("/")
        })
        .catch(err => {
            //! Dig through err to render errors conditionally
            //! Set error (in State) to err.response.data.err.errors
            console.log("Error With Form: ", err )
            setErrors(err.response.data.err.errors)
        })
        
    }


    return (
        <div className = "m-5 py-5 border border-dark-subtle">
            <h1 className = "text text-warning text-decoration-underline">Add Author Below</h1>
            <form className = "form" onSubmit = {onSubmitHandler}>
                <div>
                    <label className = "form-label">
                        {errors._name ? <p className = " text-danger">{errors._name.message}</p>: ""}
                        <input type = "text" placeholder = "Name" name = "_name" onChange = {(e) => setName(e.target.value)} className = "form-control p-1 mt-3"/>
                    </label>
                </div>
                <input type = "submit" value = "Add Author" className = "btn btn-primary mt-3"/>
            </form>
        </div>
    )
}

export default AuthorForm