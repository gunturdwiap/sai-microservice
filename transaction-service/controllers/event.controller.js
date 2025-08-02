const db = require('../models');
const User = db.User;
const Product = db.Product;

exports.event = async (req, res) => {
    try {
        const events = req.body;

        if (!events.type) {
            throw new Error("Event type is required");
        }

        console.log('Event received:', events);
        
        if (events.type) {
            if (events.type === 'UserCreated') {
                console.log('Processing UserCreated event:', events.data);
                const { id, name, email } = events.data;
                await User.create({ id, name, email });
            }

            if (events.type === 'ProductCreated') {
                console.log('Processing UserCreated event:', events.data);
                const { id, name, price, stock } = events.data;
                await Product.create({ id, name, price, stock });
            }
        }


        res.status(200).json({ message: 'Event processed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to process event', message: error.message });
    }   
}