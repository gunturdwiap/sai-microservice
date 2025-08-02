const express = require('express');
const sequelize = require('./config/db');
const db = require('./models');
const app = express();
const transactionRoutes = require('./routes/transaction.route')
const eventRoutes = require('./routes/event.route');

app.use(express.json());

app.get('/', (req, res) => res.send('API aktif!'));

// Koneksi ke database
sequelize.authenticate()
  .then(() => {
    console.log('✅ Terkoneksi ke MySQL');
    return db.sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log('✅ Sinkronisasi selesai');
  })
  .catch((err) => {
    console.error('❌ Gagal konek:', err);
  });

app.use('/api/transactions', transactionRoutes);
app.use('/api/events', eventRoutes);

// Jalankan server
app.listen(4004, () => {
  console.log('🚀 Server jalan di http://localhost:4004)');
});
