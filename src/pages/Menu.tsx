import React, {useState} from 'react';

const Menu = () => {

    const [userId] = useState(() => {
        return Number(localStorage.getItem('user_id')) || null;
    });

    return (
        <div>
            <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
                <div className="offcanvas-md offcanvas-end bg-body-tertiary" tabIndex={-1} id="sidebarMenu">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="sidebarMenuLabel">Knjižnica</h5>
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
        </div>
    );
};

export default Menu;