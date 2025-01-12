import React, {useState} from 'react';
import { Link, useNavigate } from "react-router-dom";

const Menu = () => {
    const navigate = useNavigate();

    const [userId] = useState(() => {
        return Number(localStorage.getItem('user_id')) || null;
    });

    const handleLogout = () => {
        localStorage.removeItem("user_id");
        navigate("/");
    };

    return (
        <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
            <div className="offcanvas-md offcanvas-end bg-body-tertiary" tabIndex={-1} id="sidebarMenu">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="sidebarMenuLabel">Library</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas"
                            data-bs-target="#sidebarMenu"
                            aria-label="Close"></button>
                </div>
                <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
                    <ul className="nav flex-column">
                        {userId && (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link d-flex align-items-center gap-2 active"
                                       aria-current="page"
                                       href="/books">
                                        Books
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link d-flex align-items-center gap-2 active"
                                       aria-current="page"
                                       href="/borrows">
                                        Borrows
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link d-flex align-items-center gap-2 active"
                                       aria-current="page"
                                       href="/users">
                                        Users
                                    </a>
                                </li>
                                <hr/>
                                <Link
                                    className="nav-link d-flex align-items-center gap-2 active"
                                    aria-current="page"
                                    onClick={handleLogout}
                                    to={`/`}>
                                    Logout
                                </Link>
                            </>
                        )}
                        {!userId && (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link d-flex align-items-center gap-2 active"
                                       aria-current="page"
                                       href="/">
                                    Login
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link d-flex align-items-center gap-2 active"
                                       aria-current="page"
                                       href="/register">
                                        Register
                                    </a>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Menu;