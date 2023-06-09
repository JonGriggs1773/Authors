
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AuthorForm from './components/AuthorForm';
import List from './components/List';
import Update from './components/Update';
import './App.css';

function App() {
    

    //! Test to make sure api calls to the backend are successful, remove when "get all" component is built
    

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route element = {<AuthorForm/>} path = "/form"/>
                    <Route element = {<List/>} path = "/"/>
                    <Route element = {<Update/>} path = "/update/:id"/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
