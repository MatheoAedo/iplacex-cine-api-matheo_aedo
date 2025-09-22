export function validateActor(data) {
const errors = [];
if (!data) errors.push('Objeto vacío');


if (!data.idPelicula || typeof data.idPelicula !== 'string') errors.push('idPelicula debe ser string (nombre de la pelicula)');
if (!data.nombre || typeof data.nombre !== 'string') errors.push('nombre debe ser string');
if (typeof data.edad !== 'number' || !Number.isInteger(data.edad)) errors.push('edad debe ser integer');
if (typeof data.estaRetirado !== 'boolean') errors.push('estaRetirado debe ser boolean');
if (!Array.isArray(data.premios)) errors.push('premios debe ser array');


return { valid: errors.length === 0, errors };
}


export const ActorSchema = {
_id: 'ObjectId',
idPelicula: 'string',
nombre: 'string',
edad: 'int',
estaRetirado: 'bool',
premios: 'array'
};