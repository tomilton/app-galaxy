export interface Persona {
    pkpersona:       number;
    nombre:          string;
    apellido:        string;
    edad:            number;
    altura:          number;
    peso:            number;
    genero:          string;
    fechaNacimiento: string | null;
    contador:        number;
    planeta:         Planeta;
}

export interface Planeta {
    pkplaneta:       number;
    nombre:          string;
    periodoRotacion: string;
    diametro:        number;
    clima:           string;
    terreno:         string;
    cantidadPersona: number;
    contador:        number;
}