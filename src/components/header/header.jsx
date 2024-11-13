import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Импортируем Link
import './header.scss';

function Header() {
    return (
        <div className='header'>
            <Link className='header_href' to="/">
                <h1 className="header_header">Список сервисов</h1>
            </Link>
        </div>
    );
}

export default Header;