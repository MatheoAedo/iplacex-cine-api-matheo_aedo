import { ObjectId } from 'mongodb';
import { getDb } from '../common/db.js';
import { validatePelicula } from './pelicula.js';

const peliculaCollection = () => getDb().collection('peliculas');

export async function handleInsertPeliculaRequest(req, res) {
const pelicula = req.body;
const { valid, errors } = validatePelicula(pelicula);
if (!valid) return res.status(400).json({ error: 'Datos inválidos', details: errors });


peliculaCollection()
.insertOne(pelicula)
.then((result) => res.status(201).json({ message: 'Pelicula creada', insertedId: result.insertedId }))
.catch((err) => res.status(500).json({ error: 'Error al insertar pelicula', details: err.message }));
}


export async function handleGetPeliculasRequest(req, res) {
peliculaCollection()
.find()
.toArray()
.then((docs) => res.status(200).json(docs))
.catch((err) => res.status(500).json({ error: 'Error al obtener peliculas', details: err.message }));
}


export async function handleGetPeliculaByIdRequest(req, res) {
const { id } = req.params;
try {
const oid = new ObjectId(id);
peliculaCollection()
.findOne({ _id: oid })
.then((doc) => {
if (!doc) return res.status(404).json({ error: 'Pelicula no encontrada' });
return res.status(200).json(doc);
})
.catch((err) => res.status(500).json({ error: 'Error al obtener pelicula', details: err.message }));
} catch (err) {
return res.status(400).json({ error: 'Id mal formado' });
}
}


export async function handleUpdatePeliculaByIdRequest(req, res) {
const { id } = req.params;
const update = req.body;
try {
const oid = new ObjectId(id);
peliculaCollection()
.updateOne({ _id: oid }, { $set: update })
.then((result) => {
if (result.matchedCount === 0) return res.status(404).json({ error: 'Pelicula no encontrada' });
return res.status(200).json({ message: 'Pelicula actualizada' });
})
.catch((err) => res.status(500).json({ error: 'Error actualizando pelicula', details: err.message }));
} catch (err) {
return res.status(400).json({ error: 'Id mal formado' });
}
}


export async function handleDeletePeliculaByIdRequest(req, res) {
const { id } = req.params;
try {
const oid = new ObjectId(id);
peliculaCollection()
.deleteOne({ _id: oid })
.then((result) => {
if (result.deletedCount === 0) return res.status(404).json({ error: 'Pelicula no encontrada' });
return res.status(200).json({ message: 'Pelicula eliminada' });
})
.catch((err) => res.status(500).json({ error: 'Error eliminando pelicula', details: err.message }));
} catch (err) {
return res.status(400).json({ error: 'Id mal formado' });
}
}