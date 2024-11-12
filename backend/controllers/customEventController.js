import CustomEvent from "../models/CustomEvent.js";
import User from "../models/User.js";

export const createCustomEvent = async (req, res) => {
    try {
        const { name, description, starttime, endtime, location } = req.body;

        const userId = req.user && req.user.id;

        console.log("Authenticated User ID:", req.user);

        if (!userId) {
            return res.status(401).json({ message: "User ID is missing from token." });
        }

        // Create and save the new custom event
        const newEvent = new CustomEvent({
            name,
            description,
            starttime,
            endtime,
            location,
        });

        const savedEvent = await newEvent.save();

        // Add the event to the user's custom events array
        await User.findByIdAndUpdate(userId, {
            $push: { userEvents: savedEvent._id },
        });

        res.status(201).json(savedEvent);
    } catch (error) {
        console.error("Error creating custom event:", error);
        res.status(500).json({ message: "Failed to create custom event" });
    }
};

export const getCustomEvents = async (req, res) => {
    try {
        const userId = req.params.userId; // Extract userId from route params

        console.log("Hii");

        console.log(userId);
        // Find the user by userId
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Log the userEvents array to check if it contains valid ObjectId references
        console.log("User events:", user.userEvents);

        // Find the custom events for the specific user using the userEvents array
        const customEvents = await CustomEvent.find({
            _id: { $in: user.userEvents }, // Match custom events whose IDs are in the userEvents array
        });

        // Log the custom events retrieved from the query
        console.log("Custom events found:", customEvents);

        // Check if events are found
        if (!customEvents || customEvents.length === 0) {
            return res.status(404).json({ message: "No custom events found for this user" });
        }

        // Return the custom events as JSON
        res.json(customEvents);
    } catch (error) {
        console.error("Error fetching custom events:", error);
        res.status(500).json({ message: "Error fetching custom events" });
    }
};
