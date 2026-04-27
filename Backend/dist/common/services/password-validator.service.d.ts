export declare class PasswordValidatorService {
    private readonly reglas;
    private readonly traducciones;
    validar(password: string): void;
    obtenerEstadoReglas(password: string): {
        descripcion: string;
        cumplida: boolean;
    }[];
    private traducir;
}
