import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import Sidebar from '../components/sideBar';
import Topbar from '../components/topBar';
import axios from 'axios';

const ItemLost = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hostUrl = import.meta.env.VITE_HOST_URL;
  const navigate = useNavigate(); // Hook for navigation

  // Fetch lost items from the backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${hostUrl}/api/items`);
        const lostItems = response.data.filter(
          (item) => item.status === 'lost' && item.ticket === 'pending'
        );
        setItems(lostItems);
        setFilteredItems(lostItems);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch items');
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Handle search input changes
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value === '') {
      setFilteredItems(items);
    } else {
      const filtered = items.filter(
        (item) =>
          item.name.toLowerCase().includes(value) ||
          item.description?.toLowerCase().includes(value) ||
          item.detailedDescription?.toLowerCase().includes(value)
      );
      setFilteredItems(filtered);
    }
  };

  // Mark an item as "Completed"
  const handleSuccess = async (id) => {
    try {
      await axios.put(`${hostUrl}/api/items/${id}`, { ticket: 'completed' });
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, ticket: 'completed' } : item
        )
      );
      setFilteredItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, ticket: 'completed' } : item
        )
      );
    } catch (err) {
      setError('Failed to mark item as completed');
    }
  };

  // Delete an item
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${hostUrl}/api/items/${id}`);
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
      setFilteredItems((prevItems) =>
        prevItems.filter((item) => item.id !== id)
      );
    } catch (err) {
      setError('Failed to delete item');
    }
  };

  // Navigate to image description page
  const navigateToDescription = (item) => {
    navigate('/imgDescriptions', { state: { item } });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-y-auto">
        <Topbar />
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            BROWSE LOST ITEMS
          </h1>

          <div className="flex justify-center mb-6">
            <input
              type="text"
              placeholder="Search for an item..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full max-w-md px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-6 py-4 bg-blue-300 text-white rounded-r-lg hover:bg-blue-500">
              🔍
            </button>
          </div>

          {loading ? (
            <p className="text-center text-gray-500">Loading items...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : filteredItems.length === 0 ? (
            <p className="text-center text-gray-500">No items found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 shadow-md rounded-lg hover:shadow-lg transition-transform transform hover:-translate-y-1"
                >
                  <img
                    src={item.imageUrl || '/placeholder-image.png'}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-lg mb-4 cursor-pointer"
                    onClick={() => navigateToDescription(item)}
                  />
                  <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Date:</strong> {item.dateTime}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Location:</strong> {item.location}
                  </p>

                  <div className="mt-4 flex justify-between">
                    <button
                      className={`px-4 py-2 rounded-lg text-white ${
                        item.ticket === 'completed'
                          ? 'bg-gray-500 cursor-not-allowed'
                          : 'bg-green-500 hover:bg-green-600'
                      }`}
                      onClick={() => handleSuccess(item.id)}
                      disabled={item.ticket === 'completed'}
                    >
                      {item.ticket === 'completed'
                        ? 'Completed'
                        : 'Mark as Completed'}
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ItemLost;
