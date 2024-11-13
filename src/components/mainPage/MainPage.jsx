import React, { useState, useEffect } from 'react';
import './MainPage.scss';
import SearchItem from "./searchItem/SearchItem";
import Plates from "./plates/Plates";
import Header from '../header/header';
import ModalAdd from './modalAdd/ModalAdd';
import Modal from './modalAdd/components/Modal';

function MainPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [passwords, setPasswords] = useState([]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const storedPasswords = JSON.parse(localStorage.getItem('passwords')) || [];
        setPasswords(storedPasswords);
    }, []);

    const updatePasswords = (newPasswords) => {
        setPasswords(newPasswords);
    };

    return (
        <div className='wrapper'>
            <div className='header-1'>
                <Header />
            </div>
            <div className="main-container">
                <div className='modal_main'>
                    <ModalAdd onClick={openModal} />
                    <Modal isOpen={isModalOpen} onClose={closeModal} updatePasswords={updatePasswords}/>
                </div>
                <div className='SearchItem'>
                    <SearchItem />
                </div>
                <div className='Plates'>
                    <Plates passwords={passwords} setPasswords={setPasswords}/>
                </div>
            </div>
        </div>
    );
}

export default MainPage;