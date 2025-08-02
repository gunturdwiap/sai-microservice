const { Product } = require("../models");

exports.event = async (req, res) => {
    try {
        const events = req.body;

        if (!events.type) throw new Error("Event type is required");
        console.log('Event received:', events);

        if (events.type === 'ProductStockUpdated') {
            const { id, stock, updatedAt } = events.data;
            const product = await Product.findByPk(id);
            if (!product) return res.status(404).json({ error: 'Product tidak ditemukan' });
            await product.update({ stock, updatedAt });
        }

        res.status(200).json({ message: 'Event processed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to process event' });
    }   
}