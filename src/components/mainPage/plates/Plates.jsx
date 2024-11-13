import React, { useState } from 'react';
import { ReactComponent as DeleteIcon } from './icons/Delete.svg';
import './Plates.scss';

export const Plates = ({ passwords, setPasswords }) => {
    const [responseMessage, setResponseMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(null);

    const showMessage = (message, success) => {
        setResponseMessage(message);
        setIsSuccess(success);
        setTimeout(() => {
            setResponseMessage('');
            setIsSuccess(null);
        }, 1000);
    };

    const handleDelete = (serviceToDelete) => {
        const isSuccess = Math.random() > 0.5;

        if (isSuccess) {
            const existingEntries = JSON.parse(localStorage.getItem('passwords')) || [];
            const updatedEntries = existingEntries.filter(entry => entry.service !== serviceToDelete);

            if (updatedEntries.length < existingEntries.length) {
                showMessage('Пароль успешно удален!');
                localStorage.setItem('passwords', JSON.stringify(updatedEntries));
                setPasswords(updatedEntries);
            }
        } else {
            showMessage('Ошибка удаления пароля. Попробуйте еще раз.');
        }
    };

    const handleService = (entry) => {
        console.log('Вы выбрали сервис:', entry.password);
        navigator.clipboard.writeText(entry.password);
        showMessage('Пароль успешно скопирован');
      };

    return (
        <div className='plates_wrapper'>
            {passwords.length > 0 ? (
                passwords.map((entry, index) => (
                    <div key={index} className='plate'>
                        <div className='force_plate'></div>
                        <div className='text_plate'>{entry.service}</div>
                        <div className='password_plate' onClick={() => handleService(entry)}>{entry.password}</div>
                        <div className='delete_plate' onClick={() => handleDelete(entry.service)}><DeleteIcon id="delete_icon" /></div>
                    </div>
                ))
            ) : (
                <div className='no_data'>Нет сохраненных паролей</div>
            )}
            {responseMessage && (
                <div className={`notification-message ${isSuccess ? 'success' : 'error'}`}>
                    {responseMessage}
                </div>
            )}
        </div>
    );
};

export default Plates;