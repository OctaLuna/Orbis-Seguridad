export declare class PasswordValidatorService {
    private readonly reglas;
    validar(password: string): void;
    obtenerEstadoReglas(password: string): {
        descripcion: string;
        cumplida: boolean;
    }[];
}
