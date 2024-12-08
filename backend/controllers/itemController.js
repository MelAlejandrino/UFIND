import { addItem, getItems, getItemById, getItemsByUserId, getPendingItem, addClaimItem } from '../models/itemModel.js';

export const claimItemHandler = async (req, res) => {
    const {
        studentId,
        name,
        description,
        yearSection,
        timeLost,
        locationLost,
        itemId,
    } = req.body;

    // Validate required fields
    if (!studentId || !name || !description || !yearSection || !timeLost || !locationLost || !itemId) {
        return res.status(400).json({
            message: 'All fields are required',
        });
    }

    try {
        const addedItemId = await addClaimItem({
            studentId,
            name,
            description,
            yearSection,
            timeLost,
            locationLost,
            itemId, // Pass the itemId from the request
        });
        res.status(201).json({ message: 'Item added successfully', addedItemId });
    } catch (error) {
        res.status(500).json({ message: `Error adding item: ${error.message}` });
    }
    
};

export const getItemsHandler = async (req, res) => {
    try {
        const items = await getItems();
        res.status(200).json(items); // Send the list of items as a response
    } catch (error) {
        res.status(500).json({ message: `Error retrieving items: ${error.message}` });
    }
};

export const getItemsByUserIdHandler = async (req, res) => {
    const { studentId } = req.params;
  
    try {
      const items = await getItemsByUserId(studentId); // Fetch items for the specific user
      res.status(200).json(items); // Return an empty array if no items are found
    } catch (error) {
      res.status(500).json({ message: `Error retrieving items: ${error.message}` });
    }
  };
  
  export const getPendingHandler = async (req, res) => {
    const { status } = req.params;
  
    try {
      const items = await getPendingItem(status); // Fetch items for the specific user
      res.status(200).json(items); // Return an empty array if no items are found
    } catch (error) {
      res.status(500).json({ message: `Error retrieving tickets: ${error.message}` });
    }
  };



export const getItemByIdHandler = async (req, res) => {
    const { itemID } = req.params; // Get the item ID from URL parameters

    try {
        const item = await getItemById(itemID); // Fetch item by ID
        res.status(200).json(item); // Send the item data as a response
    } catch (error) {
        res.status(500).json({ message: `Error retrieving item: ${error.message}` });
    }
};

export const addItemHandler = async (req, res) => {
    const {
        studentId,
        name,
        description,
        dateTime,
        fullName,
        contactNumber,
        email,
        status,
        ticket,
        location,
        imageUrl,
    } = req.body;

    // Validate required fields
    if (!studentId || !name || !description || !dateTime || !fullName || !contactNumber || !email || !status || !ticket || !location || !imageUrl) {
        return res.status(400).json({
            message: 'All fields are required: name, description, dateTime, fullName, contactNumber, email, status, location, and imageURL.',
        });
    }

    try {
        const itemId = await addItem({
            studentId,
            name,
            description,
            dateTime,
            fullName,
            contactNumber,
            email,
            status,
            ticket,
            location,
            imageUrl, // Pass imageURL to the model
        });
        res.status(201).json({ message: 'Item added successfully', itemId });
    } catch (error) {
        res.status(500).json({ message: `Error adding item: ${error.message}` });
    }
};

