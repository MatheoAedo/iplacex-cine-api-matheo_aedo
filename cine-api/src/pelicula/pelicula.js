export function validatePelicula(data) {
const errors = [];
if (!data) errors.push('Objeto vacío');


if (!data.nombre || typeof data.nombre !== 'string') errors.push('nombre debe ser string');
if (!Array.isArray(data.generos)) errors.push('generos debe ser array');
if (typeof data.anioEstreno !== 'number' || !Number.isInteger(data.anioEstreno))
errors.push('anioEstreno debe ser integer');


return { valid: errors.length === 0, errors };
}

export const PeliculaSchema = {
_id: 'ObjectId',
nombre: 'string',
generos: 'array',
anioEstreno: 'int'
};