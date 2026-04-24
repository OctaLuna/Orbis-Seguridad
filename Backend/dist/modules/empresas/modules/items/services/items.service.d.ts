import { CreateItemDto } from '../dto/create-item.dto';
import { UpdateItemDto } from '../dto/update-item.dto';
import { Item } from '../entities/item.entity';
import { EntityManager, Repository } from 'typeorm';
export declare class ItemsService {
    private readonly itemRepository;
    constructor(itemRepository: Repository<Item>);
    create(createItemDto: CreateItemDto): string;
    createTransaction(manager: EntityManager, data: CreateItemDto): Promise<({
        idEmpresa: number;
        nombre: string;
    } & Item)[]>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateItemDto: UpdateItemDto): string;
    remove(id: number): string;
}
