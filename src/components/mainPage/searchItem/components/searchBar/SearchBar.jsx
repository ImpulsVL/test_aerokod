import React, { useState, useRef, useEffect } from 'react';
import { ReactComponent as SearchLogo } from './icons/Search.svg';
import { ReactComponent as ClearIcon } from './icons/Clear.svg';
import './SearchBar.scss';

export const SearchBar = () => {
    const [searchText, setSearchText] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [filteredServices, setFilteredServices] = useState([]);

    const [loading, setLoading] = useState(false);
    
    const inputRef = useRef(null);
    const wrapperRef = useRef(null);

    const getServicesFromLocalStorage = () => {
        const storedData = JSON.parse(localStorage.getItem('passwords')) || [];
        return storedData.map(entry => entry.service);
    };

    useEffect(() => {
        if (searchText) {
            const services = getServicesFromLocalStorage();
            const filtered = services.filter(service =>
                service.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredServices(filtered);
            setShowResults(true);
        } else {
            setShowResults(false);
            setFilteredServices([]);
        }
    }, [searchText]);

    const handleInputChange = (e) => {
        setSearchText(e.target.value);
    };

    const clearSearch = () => {
        setSearchText('');
        setShowResults(false);
    };

    const handleSearchIconClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setShowResults(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleServiceClick = (service) => {
        console.log('Вы выбрали сервис:', service);
    };

    return (
        <div className="search_bar_wrapper" ref={wrapperRef}>
            <div className="input_wrapper">
                <input
                    ref={inputRef}
                    type="text"
                    value={searchText}
                    onChange={handleInputChange}
                    placeholder="Введите название сервиса"
                />
                <button
                    type="button"
                    className="icon_button"
                    onClick={clearSearch}
                    style={{ display: searchText ? 'block' : 'none' }}
                >
                    <ClearIcon id="clear_icon" />
                </button>
                <button
                    type="button"
                    className="icon_button"
                    onClick={handleSearchIconClick}
                    style={{ display: searchText ? 'none' : 'block' }}
                >
                    <SearchLogo id="search_icon" />
                </button>
            </div>

            {showResults && searchText && (
                <div className="search_results">
                    {loading ? (
                        <div className="loading">Загрузка...</div>
                    ) : filteredServices.length > 0 ? (
                        filteredServices.map((service, index) => (
                            <div
                                key={index}
                                className="search_result_item"
                                onClick={() => handleServiceClick(service)}
                            >
                                <span className="service_name">{service}</span>
                            </div>
                        ))
                    ) : (
                        <div className="no_results">В соответствии с запросом не найдены сервисы</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
