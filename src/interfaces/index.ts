// src/interfaces/index.ts

// La forma de una Tarea (según el GET /todos)
export interface Todo {
    id: string;
    title: string;
    completed: boolean;
    photoUri?: string; // El campo de la imagen (puede venir o no)
    location?: {
        latitude: number;
        longitude: number;
    };
    userId?: string;
    createdAt?: string;
}

// La respuesta cuando hacemos Login o Registro
export interface AuthResponse {
    success: boolean;
    data?: {
        token: string;
        userId: string;
    };
    error?: string;
}

// Una respuesta genérica de la API (útil para reutilizar)
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    error?: string;
    message?: string;
}