import { EmpresaDt } from '../entities/empresa-dt.entity';
import { Repository } from 'typeorm';
export declare class DatamartService {
    private readonly empresaDtRepository;
    constructor(empresaDtRepository: Repository<EmpresaDt>);
    findAll(): Promise<EmpresaDt[]>;
}
