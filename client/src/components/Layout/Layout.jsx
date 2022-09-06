import React from 'react';
import {Outlet, Link} from "react-router-dom";
import './layout.css';
const Layout = () => {
    return (
        <div className='layout-container'>
            <header><Link to="/">Comments Inc.</Link></header>
            <main className='layout-content-container'>
                <Outlet/>
            </main>
            <footer>Copyright 2022</footer>
        </div>
    );
};

export default Layout;
