import { ImagenesService } from '../services/imagenes.service';
import { CreateImageneDto } from '../dto/create-imagene.dto';
import { UpdateImageneDto } from '../dto/update-imagene.dto';
export declare class ImagenesController {
    private readonly imagenesService;
    constructor(imagenesService: ImagenesService);
    create(createImageneDto: CreateImageneDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateImageneDto: UpdateImageneDto): string;
    remove(id: string): string;
    getByEmpresa(idEmpresa: string): Promise<import("../entities/imagen.entity").Imagen[] | {
        mensaje: string;
    }>;
}
