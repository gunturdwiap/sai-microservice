const db = require('../models');
const User = db.User;
const Product = db.Product;

exports.event = async (req, res) => {
    try {
        const events = req.body;

        if (!events.type) throw new Error("Event type is required");
        console.log('Event received:', events);
    
        if (events.type === 'UserCreated') {
            const { id, name, email } = events.data;
            await User.create({ id, name, email });
        }

        if (events.type === 'UserUpdated') {
            const { id, name, email } = events.data;
               
            const user = await User.findByPk(id);
            if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });
            await user.update({ name, email });
        }
        
        if (events.type === 'UserDeleted') {
            const { id } = events.data;

            const user = await User.findByPk(id);
            if (!user) throw new Error('User tidak ditemukan');
            await user.destroy({
                where: { id }
            });
        }

        if (events.type === 'ProductCreated') {
            const { id, name, price, stock } = events.data;
            await Product.create({ id, name, price, stock });
        }



        res.status(200).json({ message: 'Event processed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to process event', message: error.message });
    }   
}