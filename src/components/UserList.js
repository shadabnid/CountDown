import React, { useState, useEffect } from 'react';
import { FaSearch } from "react-icons/fa";
import UserItem from './UserItem';
import './UserList.css';
import ShowHistory from './ShowHistory';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchHistory, setSearchHistory] = useState(
        () => {
            const savedSearchHistory = localStorage.getItem('searchHistory');
            return savedSearchHistory ? JSON.parse(savedSearchHistory) : [];
        }
    );
    const [typingTimeout, setTypingTimeout] = useState(null);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        fetchUsers();
        const savedSearchHistory = localStorage.getItem('searchHistory' || []);
        if (savedSearchHistory) {
            setSearchHistory(JSON.parse(savedSearchHistory));
        }
    }, []);

    useEffect(() => {
        filterUsers();
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }, [searchTerm, users, searchHistory]);

    const fetchUsers = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };
    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        clearTimeout(typingTimeout);
        if (term !== '') {
            setTypingTimeout(setTimeout(() => {
                setSearchHistory(prev => [...prev, term]);
            }, 1000));
        }
    };

    const clearSearchHistory = () => {
        setSearchTerm('');
        setSearchHistory([]);
        localStorage.removeItem('searchHistory');
    }

    const filterUsers = () => {
        const filtered = users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredUsers(filtered);
    };
    const handleSortByName = () => {
        const sortedUsers = [...filteredUsers].sort((a, b) => a.name.localeCompare(b.name));
        setFilteredUsers(sortedUsers);
    };


    return (
        <>
            <div className='main-container'>
                <div className='search-sort'>
                    <div className='search-history'>
                        <div className='search-bar'>
                            <FaSearch id='search-icon' />
                            <input
                                type="text"
                                className='search-input'
                                placeholder="Search by name"
                                value={searchTerm}
                                onChange={handleSearch}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                            />
                        </div>
                        {isFocused && searchHistory.length > 0 && (
                            <ShowHistory searchHistory={searchHistory} />

                        )}
                    </div>
                </div>
                <div className='container-btn'>
                    <button className='btn sort-btn' onClick={handleSortByName}>Sort By Name</button>
                    <button className='btn clear-btn' onClick={clearSearchHistory}>Clear History</button>
                </div>
                <div className='user-container'>

                    {
                        filteredUsers.map((user) => (
                            <UserItem key={user.id} user={user} />
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default UserList