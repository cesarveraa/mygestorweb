const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { db } = require('./src/config/firebaseConfig');

const app = express();
const allowedOrigins = [
    'http://localhost:5173', // Frontend local
    'https://frontexpendientes-m4ile77xf-ces-projects-d630e237.vercel.app', // Frontend en producción
  ];
  
  app.use(cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('CORS policy blocked this request.'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
    credentials: true, // Si usas cookies o encabezados de autenticación
  }));
app.use(express.json());


const multer = require("multer");
const upload = multer(); // Configuración de multer para datos sin archivos
app.use(express.urlencoded({ extended: true })); // Maneja datos en x-www-form-urlencoded

// Importar rutas
const userRoutes = require('./src/api/user/user.routes');
const authRoutes = require('./src/api/auth/auth.routes');
const recordRoutes = require('./src/api/record/record.routes');
const movementRoutes = require('./src/api/movement/movement.routes');
const audienceRoutes = require('./src/api/audience/audience.routes');

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes); 
app.use('/api/record', recordRoutes); 
app.use('/api/movement', movementRoutes);
app.use('/api/audience', audienceRoutes);




// Prueba de conexión con Firestore
db ? console.log("Firestore conectado correctamente") : console.error("Error al conectar con Firestore");
app.use(upload.none());
module.exports = app;
