import React, { useState } from 'react';
import './Modal.scss';

function Modal({ isOpen, onClose, updatePasswords }) {
    const [service, setService] = useState('');
    const [password, setPassword] = useState('');

    const [userChars, setUserChars] = useState('');

    const [responseMessage, setResponseMessage] = useState('');
    const [lengthNumbers, setLength] = useState(8);
    const [useLetters, setUseLetters] = useState(true);
    const [useNumbers, setUseNumbers] = useState(true);
    const [useSpecialChars, setUseSpecialChars] = useState(false);
    const [useUserChars, setUseUserChars] = useState(false);
    const [caseOption, setCaseOption] = useState('mixed');

    if (!isOpen) return null;

    const handleSubmit = (event) => {
        event.preventDefault();

        const isSuccess = Math.random() > 0.5;

        if (isSuccess) {
            const existingEntries = JSON.parse(localStorage.getItem('passwords')) || [];
            const existingService = existingEntries.find(entry => entry.service === service);

            if (existingService) {
                existingService.password = password;
                setResponseMessage('Пароль для сервиса обновлен!');
            } else {
                const newEntry = { service, password };
                existingEntries.push(newEntry);
                setResponseMessage('Данные успешно сохранены!');
            }

            localStorage.setItem('passwords', JSON.stringify(existingEntries));
            updatePasswords(existingEntries);
        } else {
            setResponseMessage('Ошибка при сохранении данных. Попробуйте еще раз.');
        }

        setTimeout(() => {
            setResponseMessage('');
        }, 1000);

        setService('');
        setPassword('');
    };

    if (!isOpen) return null;

    const handlePasswordGeneration = () => {
        let characterSet = '';

        if (useUserChars) {
            characterSet = userChars;
        } else {
            if (useLetters) characterSet += 'abcdefghijklmnopqrstuvwxyz';
            if (useNumbers) characterSet += '0123456789';
            if (useSpecialChars) characterSet += '!@#$%^&*()_+[]{}|;:,.<>?';

            if (caseOption === 'upper') characterSet = characterSet.toUpperCase();
            else if (caseOption === 'mixed') characterSet += characterSet.toUpperCase();
        }

        let generatedPassword = '';

        for (let i = 0; i <= lengthNumbers; i++) {
            generatedPassword += characterSet[Math.floor(Math.random() * characterSet.length)];
        }

        setPassword(generatedPassword);
    };

    const AnyCheckboxChecked = () => {
        return useLetters || useNumbers || useSpecialChars || useUserChars;
    };

    return (
        <div id="modal" className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Добавить сервис и пароль</h2>
                <form id="passwordForm" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="service">Сервис</label>
                        <input
                            className='form-input'
                            type="text"
                            id="service"
                            value={service}
                            onChange={(e) => setService(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Пароль</label>
                        <input
                            className='form-input'
                            type="text"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Настройки генерации пароля</label>
                        <input
                            className='form-input'
                            type="number"
                            value={lengthNumbers}
                            onChange={(e) => setLength(Number(e.target.value))}
                            min="4"
                            max="20"
                            placeholder="Длина пароля"
                        />
                        <div className='check-values'>
                            <label className='check-value'>
                                <input
                                    type="checkbox"
                                    checked={useLetters}
                                    onChange={() => setUseLetters(!useLetters)}
                                    disabled={useUserChars}
                                />
                                Буквы
                            </label>
                            <label className='check-value'>
                                <input
                                    type="checkbox"
                                    checked={useNumbers}
                                    onChange={() => setUseNumbers(!useNumbers)}
                                    disabled={useUserChars}
                                />
                                Цифры
                            </label>
                            <label className='check-value'>
                                <input
                                    type="checkbox"
                                    checked={useSpecialChars}
                                    onChange={() => setUseSpecialChars(!useSpecialChars)}
                                    disabled={useUserChars}
                                />
                                Спецсимволы
                            </label>
                        </div>
                        <div>
                            <label>
                                Регистр:
                                <select
                                    className='form-input'
                                    value={caseOption}
                                    onChange={(e) => setCaseOption(e.target.value)}
                                >
                                    <option value="mixed">Смешанный</option>
                                    <option value="lower">Нижний</option>
                                    <option value="upper">Верхний</option>
                                </select>
                            </label>
                        </div>
                        <div className='check-value'>
                            <input
                                type="checkbox"
                                checked={useUserChars}
                                onChange={() => setUseUserChars(!useUserChars)}
                            />
                            Пользовательский набор данных
                        </div>
                        <div className="form-group">
                            <label htmlFor="userChars">Пользовательский набор символов</label>
                            <input
                                className='form-input'
                                type="text"
                                id="customCharacters"
                                value={userChars}
                                onChange={(e) => setUserChars(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='buttons'>
                        <button className="generation-button" type="button" disabled={!AnyCheckboxChecked()} onClick={handlePasswordGeneration}>Сгенерировать пароль</button>
                        <button type="submit" className="submit-button">Сохранить</button>
                    </div>
                    {responseMessage && <div className="response-message">{responseMessage}</div>}
                </form>
            </div>
        </div>
    );
}

export default Modal;