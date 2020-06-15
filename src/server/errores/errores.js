function crearError(estado, motivo) {
    return { status: estado, descripcion: motivo }
}

export {
    crearError
}