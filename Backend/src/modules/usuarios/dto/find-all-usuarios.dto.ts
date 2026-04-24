import { ApiProperty } from "@nestjs/swagger";
import { UsuarioDto } from "./usuario.dto";

export class FindAllUsuariosDto {
    @ApiProperty({
        description: 'Lista de usurios',
        type: [UsuarioDto]
    })
    usuarios: UsuarioDto[]
}