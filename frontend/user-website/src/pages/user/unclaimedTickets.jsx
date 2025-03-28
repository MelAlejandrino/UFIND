import React, { useEffect, useState } from "react";
import axios from "axios"; // Ensure axios is installed
import Topbar from "../../components/user/topBar";
import Footer from "../../components/user/footer";

const UnclaimedTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTickets, setFilteredTickets] = useState([]);

  useEffect(() => {
    // Fetch tickets from the backend where status is "Pending"
    axios
      .get("https://mel-backend.jwisnetwork.com/api/items/status/pending") // Adjust based on your backend API
      .then((response) => {
        console.log(response.data);
        setTickets(response.data);
        setFilteredTickets(response.data); // Initialize filtered tickets
      })
      .catch((error) => {
        console.error("Error fetching tickets:", error);
      });
  }, []);

  // Dynamic Styling for Status and Category
  const statusColors = {
    Lost: "bg-gray-900 text-white",
    Found: "bg-blue-500 text-white",
  };

  // Handle search input changes
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter tickets based on search query
    const filtered = tickets.filter(
      (ticket) =>
        ticket.name.toLowerCase().includes(query) ||
        ticket.description.toLowerCase().includes(query) ||
        (ticket.category && ticket.category.toLowerCase().includes(query)) // Check category if it exists
    );

    setFilteredTickets(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Topbar */}
      <Topbar />

      {/* Main Content */}
      <main className="flex-grow py-10 px-4">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Unclaimed Tickets
        </h2>

        {/* Search Bar */}
        <div className="flex items-center justify-center w-full max-w-2xl mx-auto mb-8">
          <input
            type="text"
            className="w-full p-4 border border-gray-300 rounded-l-lg focus:outline-none"
            placeholder="Search tickets..."
            value={searchQuery} // Controlled input
            onChange={handleSearch} // Update search query on input change
          />
          <button className="px-6 py-4 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600">
            🔍
          </button>
        </div>

        {/* Ticket List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden border-solid border-2 border-red-600"
            >
              {/* Image Section */}
              <div className="flex justify-center items-center bg-gray-200 p-4 md:w-1/2">
                <img
                  src={ticket.imageUrl}
                  alt={`Image of ${ticket.name}`}
                  className="max-h-80 object-contain rounded"
                />
              </div>

              {/* Details Section */}
              <div className="p-6 md:w-1/2">
                <div className="flex flex-col space-y-4">
                  {/* Item Name and Category */}
                  <div>
                    <h3 className="font-bold text-lg">{ticket.name.toUpperCase()}</h3>
                    <span
                      className={`text-sm font-bold px-3 py-1 rounded-full inline-block ${
                        statusColors[ticket.status] || "bg-gray-400 text-white"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </div>

                  {/* Other Details */}
                  <div>
                    <label className="block text-sm font-semibold">
                      Last Seen Location
                    </label>
                    <input
                      type="text"
                      value={ticket.location}
                      readOnly
                      className="w-full p-2 border rounded-md bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold">Description</label>
                    <input
                      type="text"
                      value={ticket.description}
                      readOnly
                      className="w-full p-2 border rounded-md bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold">Date & Time</label>
                    <input
                      type="text"
                      value={ticket.dateTime}
                      readOnly
                      className="w-full p-2 border rounded-md bg-gray-50"
                    />
                  </div>
                </div>

                {/* Buttons Section */}
                <div className="flex flex-col space-y-4 mt-6">
                  <div className="flex space-x-4">
                    <button className="bg-green-500 text-white font-semibold px-4 py-2 rounded hover:bg-green-600">
                      Edit
                    </button>
                    <button className="bg-red-500 text-white font-semibold px-4 py-2 rounded hover:bg-red-600">
                      Delete
                    </button>
                  </div>

                  <button
                    className={`w-full py-2 rounded-full font-semibold ${
                      statusColors[ticket.status] || "bg-gray-400 text-white"
                    }`}
                  >
                    {ticket.status}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default UnclaimedTickets;
