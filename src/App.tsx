import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import Books from "./pages/books/Books";
import BooksView from "./pages/books/BooksView";
import BooksCreate from "./pages/books/BooksCreate";
import BooksEdit from "./pages/books/BooksEdit";
import Borrows from "./pages/borrows/Borrows";
import Users from "./pages/users/Users";
import UsersEdit from "./pages/users/UsersEdit";


function App() {
  return (
      <div className="App">
          <BrowserRouter>
              <Routes>
                  <Route path="/" Component={Login}/>
                  <Route path="/register" Component={Register}/>
                  <Route path="/books" Component={Books}/>
                  <Route path="/books/create" Component={BooksCreate}/>
                  <Route path="/books/:id" Component={BooksView}/>
                  <Route path="/books/:id/edit" Component={BooksEdit}/>
                  <Route path="/borrows" Component={Borrows}/>
                  <Route path="/users" Component={Users}/>
                  <Route path="/users/:id/edit" Component={UsersEdit}/>
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
