import { ObjectId } from 'mongodb';
import { getDb } from '../common/db.js';
import { validateActor } from './actor.js';

const actorCollection = () => getDb().collection('actores');
const peliculaCollection = () => getDb().collection('peliculas');


export async function handleInsertActorRequest(req, res) {
  const actor = req.body;
  const { valid, errors } = validateActor(actor);
  if (!valid) return res.status(400).json({ error: 'Datos inválidos', details: errors });

  try {
    let pelicula = null;

   
    if (ObjectId.isValid(actor.idPelicula)) {
      pelicula = await peliculaCollection().findOne({ _id: new ObjectId(actor.idPelicula) });
    } else {
      pelicula = await peliculaCollection().findOne({ nombre: actor.idPelicula });
    }

    if (!pelicula) return res.status(400).json({ error: 'La película indicada no existe' });

    
    actor.idPelicula = pelicula._id;

    const result = await actorCollection().insertOne(actor);
    return res.status(201).json({ message: 'Actor creado', insertedId: result.insertedId });
  } catch (err) {
    return res.status(500).json({ error: 'Error al insertar actor', details: err.message });
  }
}


export async function handleGetActoresRequest(req, res) {
  try {
    const docs = await actorCollection().find().toArray();
    return res.status(200).json(docs);
  } catch (err) {
    return res.status(500).json({ error: 'Error al obtener actores', details: err.message });
  }
}


export async function handleGetActorByIdRequest(req, res) {
  const { id } = req.params;
  try {
    const oid = new ObjectId(id);
    const doc = await actorCollection().findOne({ _id: oid });
    if (!doc) return res.status(404).json({ error: 'Actor no encontrado' });
    return res.status(200).json(doc);
  } catch (err) {
    return res.status(400).json({ error: 'Id mal formado' });
  }
}


export async function handleGetActoresByPeliculaIdRequest(req, res) {
  const { pelicula } = req.params;
  try {
    const oid = new ObjectId(pelicula);
    const docs = await actorCollection().find({ idPelicula: oid }).toArray();
    return res.status(200).json(docs);
  } catch (err) {
    return res.status(400).json({ error: 'Id mal formado' });
  }
}
