exports.event = async (req, res) => {
    try {
        const events = req.body;

        console.log('Event received:', events);

        res.status(200).json({ message: 'Event processed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to process event' });
    }   
}