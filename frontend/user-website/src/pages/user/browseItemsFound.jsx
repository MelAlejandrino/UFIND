import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/user/footer';
import Topbar from '../../components/user/topBar';
import axios from 'axios';

const BrowseItemsFound = () => {
    const [items, setItems] = useState([]);
<<<<<<< HEAD
    const [filteredItems, setFilteredItems] = useState([]);  // Added state for filtered items
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState(''); // Added state for search query

    // Fetch lost items from the backend
=======
    const [filteredItems, setFilteredItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

>>>>>>> d706f433329312b8dac206e6393ea2642b090a6a
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/items');
                const lostItems = response.data.filter(item => item.status === 'found' && item.ticket === "pending");
                setItems(lostItems);
<<<<<<< HEAD
                setFilteredItems(lostItems); // Set filteredItems initially as all items
=======
                setFilteredItems(lostItems);
>>>>>>> d706f433329312b8dac206e6393ea2642b090a6a
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Failed to fetch items');
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

<<<<<<< HEAD
    // Handle search input changes
=======
>>>>>>> d706f433329312b8dac206e6393ea2642b090a6a
    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

<<<<<<< HEAD
        // Filter items based on description, detailedDescription, or name
=======
>>>>>>> d706f433329312b8dac206e6393ea2642b090a6a
        const filtered = items.filter(item => {
            const { description = '', detailedDescription = '', name = '' } = item;
            return (
                description.toLowerCase().includes(query) ||
                detailedDescription.toLowerCase().includes(query) ||
                name.toLowerCase().includes(query)
            );
        });

        setFilteredItems(filtered);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Topbar />

<<<<<<< HEAD
            {/* Main Content Wrapper */}
            <div className="w-full px-4 py-10 max-w-7xl mx-auto">
                {/* Title */}
                <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Browse Items (Found)</h1>

                {/* Search Bar */}
=======
            <div className="w-full px-4 py-10 max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Browse Items (Found)</h1>

>>>>>>> d706f433329312b8dac206e6393ea2642b090a6a
                <div className="flex items-center justify-center w-full max-w-2xl mx-auto mb-8">
                    <input
                        type="text"
                        className="w-full p-4 border border-gray-300 rounded-l-lg focus:outline-none"
                        placeholder="Search items..."
<<<<<<< HEAD
                        value={searchQuery} // Controlled input
                        onChange={handleSearch} // Update search query on input change
=======
                        value={searchQuery}
                        onChange={handleSearch}
>>>>>>> d706f433329312b8dac206e6393ea2642b090a6a
                    />
                    <button className="px-6 py-4 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600">
                        🔍
                    </button>
                </div>

<<<<<<< HEAD
                {/* Navigation Buttons */}
=======
>>>>>>> d706f433329312b8dac206e6393ea2642b090a6a
                <div className="flex justify-center space-x-4 mb-8">
                    <Link to="/browseItemsLost" className="px-6 py-3 font-semibold bg-gray-200 text-black rounded-lg hover:bg-blue-600">
                        Lost Items
                    </Link>
                    <Link to="/browseItemsFound" className="px-6 py-3 font-semibold bg-blue-500 text-white rounded-lg hover:bg-blue-300">
                        Found Items
                    </Link>
                </div>

<<<<<<< HEAD
                {/* Items Grid */}
=======
>>>>>>> d706f433329312b8dac206e6393ea2642b090a6a
                {loading ? (
                    <p className="text-center text-gray-500">Loading items...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {filteredItems.map((item) => (
                            <Link
<<<<<<< HEAD
                            key={item.id}
                            to={`/items/${item.id}`} // Dynamic link for each item's ID
                            className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
                        >
                            <img
                                src={item.imageUrl || '/placeholder-image.png'} // Fallback image if no URL
                                alt={item.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4 text-center">
                                <h2 className="font-bold text-lg text-gray-800">{item.name}</h2>
                                <p className="text-sm text-gray-600">{item.dateTime}</p>
                                <p className="text-sm text-gray-600">{item.lastSeen}</p>
                            </div>
                        </Link>
=======
                                key={item.id}
                                to={`/items/${item.id}`}
                                className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
                            >
                                <div className="blur-container">
                                    <img
                                        src={item.imageUrl || '/placeholder-image.png'}
                                        alt={item.name}
                                        className="w-full h-48 object-cover filter blur-lg"
                                    />
                                    <div className="p-4 text-center">
                                        <h2 className="font-bold text-lg text-gray-800">{item.name}</h2>
                                        <p className="text-sm text-gray-600">{item.dateTime}</p>
                                        <p className="text-sm text-gray-600">{item.lastSeen}</p>
                                    </div>
                                </div>
                            </Link>
>>>>>>> d706f433329312b8dac206e6393ea2642b090a6a
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default BrowseItemsFound;
