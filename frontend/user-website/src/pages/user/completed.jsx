import React, { useState, useEffect } from "react";
import Topbar from "../../components/user/topBar";
import Footer from "../../components/user/footer";
import axios from "axios";
import { useAuth } from "../../AuthContext";

const Completed = () => {
  const { user } = useAuth(); // Access the user information from context
  const [tickets, setTickets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch the tickets data from the API
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/items");
        const data = response.data;

        // Filter the tickets where ticket status is "completed"
        const completedTickets = data.filter(
          (item) => item.ticket === "completed"
        );
        setTickets(completedTickets); // Update tickets state with filtered data
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, [user.id]);

  // Handle search input changes
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = tickets.filter((ticket) =>
      ticket.name.toLowerCase().includes(query) ||
      ticket.description.toLowerCase().includes(query) ||
      ticket.category.toLowerCase().includes(query)
    );

    setTickets(filtered);
  };

  // Dynamic Styling for Status and Category
  const statusColors = {
    Lost: "bg-gray-900 text-white",
    Found: "bg-blue-500 text-white",
    Pending: "bg-yellow-500 text-white",
    Matched: "bg-blue-500 text-white",
    Resolved: "bg-green-500 text-white",
    Rejected: "bg-red-500 text-white",
    completed: "bg-green-500 text-white",
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      {/* Topbar */}
      <Topbar />

      {/* Main Content */}
      <main className="flex-grow py-10 px-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          COMPLETED TICKETS
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
          <button
            className="px-6 py-4 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
            onClick={() => console.log("Search triggered")}
          >
            🔍
          </button>
        </div>

        {/* Ticket List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden"
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
                          statusColors[ticket.category] || "bg-gray-400 text-white"
                        }`}
                      >
                        {ticket.category}
                      </span>
                    </div>

                    {/* Other Details */}
                    <div>
                      <label className="block text-sm font-semibold">Last Seen Location</label>
                      <span className="w-full p-2 border rounded-md bg-gray-50">
                        {ticket.location}
                      </span>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold">Description</label>
                      <span className="w-full p-2 border rounded-md bg-gray-50">
                        {ticket.description}
                      </span>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold">Date & Time</label>
                      <span className="w-full p-2 border rounded-md bg-gray-50">
                        {ticket.dateTime}
                      </span>
                    </div>
                  </div>

                  {/* Buttons Section */}
                  <div className="flex flex-col space-y-4 mt-6">
                    {/* Status */}
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
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No completed tickets found.
            </p>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Completed;
