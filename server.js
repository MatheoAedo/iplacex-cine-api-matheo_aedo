import express from 'express';
import cors from 'cors';
import { connect } from './src/common/db.js';
import peliculaRoutes from './src/pelicula/routes.js';
import actorRoutes from './src/actor/routes.js';


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.get('/', (req, res) => {
res.send('Bienvenido al cine Iplacex');
});


app.use('/api', peliculaRoutes);
app.use('/api', actorRoutes);


const PORT = 3000 || 4000;


(async () => {
try {
await connect();
app.listen(PORT, () => console.log(`Servidor Express escuchando en puerto ${PORT}`));
} catch (err) {
console.error('No se pudo iniciar el servidor por error de conexión a DB.');
process.exit(1);
}
})();