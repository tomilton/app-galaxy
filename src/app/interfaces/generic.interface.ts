export interface Generic {
    totalItems: number;
    data:       Catalogo[];
}

export interface Catalogo {
    id:          number;
    codigo:      string;
    descripcion: string;
}