import { Module } from '@nestjs/common';
import { DatamartService } from './services/datamart.service';
import { DatamartController } from './controllers/datamart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpresaDt } from './entities/empresa-dt.entity';
import { MunicipioDt } from './entities/municipio-dt.entity';
import { OdsDt } from './entities/ods-dt.entity';
import { PaisDt } from './entities/pais-dt.entity';
import { ProyectoDt } from './entities/proyecto-dt.enity';
import { SedeDt } from './entities/sede-dt.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			EmpresaDt,
			MunicipioDt,
			OdsDt,
			PaisDt,
			ProyectoDt,
			SedeDt,
		])
	],
	controllers: [DatamartController],
	providers: [DatamartService],
	exports: [DatamartService]
})
export class DatamartModule { }
