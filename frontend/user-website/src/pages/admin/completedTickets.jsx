import React, { useEffect, useState } from "react";
import Sidebar from "../../components/admin/sideBar";
import Topbar from "../../components/admin/topBar";
import axios from "axios";

const CompletedTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hostUrl = import.meta.env.VITE_HOST_URL;

  // Fetch tickets from the server
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(`${hostUrl}/api/items`);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
        const unclaimedTickets = response.data.filter(
          (item) => item.ticket === "success"
        );
    
        setTickets(unclaimedTickets);
        setFilteredTickets(unclaimedTickets);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch tickets");
        setLoading(false);
      }
    };
    

    fetchTickets();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    setFilteredTickets(
      tickets.filter(
        (ticket) =>
          ticket.itemName.toLowerCase().includes(value) ||
          ticket.description.toLowerCase().includes(value)
      )
    );
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${hostUrl}/api/tickets/${id}`);
      setTickets((prev) => prev.filter((ticket) => ticket.id !== id));
      setFilteredTickets((prev) => prev.filter((ticket) => ticket.id !== id));
    } catch (err) {
      setError("Failed to delete ticket");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Topbar />

        <main className="flex-1 p-6 overflow-y-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">COMPLETED TICKETS</h1>

          <div className="flex justify-center mb-6">
            <input
              type="text"
              placeholder="Search tickets"
              className="w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={handleSearch}
            />
          </div>

          {loading ? (
            <p className="text-center text-gray-500">Loading tickets...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : filteredTickets.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
                >
                  <img
                    src={ticket.imageUrl || "/placeholder-image.png"}
                    alt={ticket.itemName}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 flex-1">
                    <h2 className="text-xl font-bold mb-2">{ticket.itemName}</h2>
                    <p className="text-gray-700 mb-1">
                      <strong>Full Name:</strong> {ticket.fullName}
                    </p>
                    <p className="text-gray-700 mb-1">
                      <strong>Description:</strong> {ticket.description}
                    </p>
                    <p className="text-gray-700 mb-4">
                      <strong>Date & Time:</strong> {ticket.dateTime}
                    </p>
                    <button
                      onClick={() => handleDelete(ticket.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No tickets found.
            </p>
          )}
        </main>
      </div>
    </div>
  );
};

export default CompletedTickets;
