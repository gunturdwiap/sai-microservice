exports.event = async (req, res) => {
    try {
        const events = req.body;

        console.log('Event received:', events);
    } catch (error) {
        res.status(500).json({ error: 'Failed to process event' });
    }   
}