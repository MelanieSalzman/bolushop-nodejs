/*import Joi from '@hapi/joi'

function validUsers(users) {
    for (const user of users) {
        validUser(user)
    }
}

function validUser(user) {
    const userSchema = {
        id: Joi.number().integer().min(0),
        name: Joi.string().alphanum().min(1).required(),
        surname: Joi.string().alphanum().min(1).required(),
        age: Joi.number().integer().min(0).max(120).required(),
        email: Joi.string().min(1).max(99999999).required(),
    }
    const { error } = Joi.validate(user, userSchema)
    if (error) {
        // throw error
        throw { message: error.message }
    }
}

function validateAges(users, from, to) {
    for (const user of users) {
        if (user.age < from || user.age > to) {
            throw { message: 'edad fuera de rango' }
        }
    }
}

function validateEqual(user1, user2) {
    if (areDifferent(user1, user2)) {
        throw { message: 'no coinciden los estudiantes comparados' }
    }
}

function validarSonLosMismos(unos, losOtros) {
    const unosRed = unos.filter(e => !!e)
    const losOtrosRed = losOtros.filter(e => !!e)

    if (unosRed.length != losOtrosRed.length) {
        throw { message: 'SE ENCONTRO DE MAS O DE MENOS' }
    }

    if (losOtrosRed.some(e => unosRed.every(e2 => sonDistintos(e, e2)))) {
        throw { message: 'NO SON LOS MISMOS' }
    }
}

function sonDistintos(uno, elOtro) {
    return !sonIguales(uno, elOtro)
}

function sonIguales(uno, elOtro) {

    for (const attr in uno) {
        if (attr != 'id') {
            if (!elOtro[attr] || uno[attr] != elOtro[attr]) {
                return false
            }
        }
    }

    for (const attr in elOtro) {
        if (attr != 'id') {
            if (!uno[attr] || elOtro[attr] != uno[attr]) {
                return false
            }
        }
    }

    return true
}

export {
    validarEstudiante,
    validarEstudiantes,
    validarEdades,
    validarSonElMismo,
    validarSonLosMismos
}*/