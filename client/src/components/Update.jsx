import {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'

const Update = () => {

    const [_name, setName] = useState("")
    const [errors, setErrors] = useState({})
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:8000/api/authors/" + id)
        .then(res => {
            console.log(res.data.author)
            setName(res.data.author._name)
        })
        .catch(err => console.log(err))
    }, [])

    const formValidator = () => {
        let isValid = true
        if(_name.length < 3) {
            isValid = false
        }
        return isValid
    }

    const onUpdateHandler = (e) => {
        if(formValidator()){
            e.preventDefault()
            axios.patch("http://localhost:8000/api/authors/" + id, {
                _name
            })
            .then(res => {
                console.log("---------------", res)
                navigate("/")
            })
            .catch(err => {
                console.log(err)
            })
        }
        else {
            e.preventDefault()
            setErrors({
                name: "Name must be at least 3 characters and is a required field"
            })
        }
    }



    return (
        <div className = "m-5 py-5 border border-dark-subtle">
            <h1 className = "text text-warning text-decoration-underline">Edit Author Below</h1>
            {errors.name ? <p className = "text-danger">{errors.name}</p>: ""}
            <form className = "form" onSubmit = {onUpdateHandler}>
                <div>
                    <label className = "form-label">
                        Name:
                        <input type = "text" placeholder = "Name" name = "_name" value = {`${_name}`} onChange = {(e) => setName(e.target.value)} className = "form-control p-1 mt-3"/>
                    </label>
                </div>
                <input type = "submit" value = "Edit Author" className = "btn btn-primary mt-3"/>
            </form>
        </div>
    )
}

export default Update