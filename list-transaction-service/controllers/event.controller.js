const db = require('../models');
const User = db.User;
const Product = db.Product;
const Transaction = db.Transaction;

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

        if (events.type === 'ProductUpdated') {
            const { id, name, price, stock } = events.data;
               
            const product = await Product.findByPk(id);
            if (!product) return res.status(404).json({ error: 'Product tidak ditemukan' });
            await product.update({ name, price, stock });
        }
        
        if (events.type === 'ProductDeleted') {
            const { id } = events.data;

            const product = await Product.findByPk(id);
            if (!product) throw new Error('Product tidak ditemukan');
            await product.destroy({
                where: { id }
            });
        }

        if (events.type === 'TransactionCreated') {
            const { id, productId, userId, quantity, totalPrice } = events.data;
            await Transaction.create({ 
                id, 
                ProductId: productId, 
                UserId: userId,
                quantity, 
                totalPrice
             });
        }


        res.status(200).json({ message: 'Event processed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to process event', message: error.message });
    }   
}