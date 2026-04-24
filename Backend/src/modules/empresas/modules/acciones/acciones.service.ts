import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Accion } from './entities/accione.entity';

@Injectable()
export class AccionesService {
  constructor(
    @InjectRepository(Accion)
    private readonly accionRepository: Repository<Accion>,
  ) {}

  findAll() {
    return this.accionRepository.find();
  }
}