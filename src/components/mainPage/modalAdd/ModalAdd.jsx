import React from 'react';
import './ModalAdd.scss';

function ModalAdd({ onClick }) {
    return (
        <div onClick={onClick} className='modal-add'>
            Добавление сервиса с паролем
        </div>
    );
}

export default ModalAdd;