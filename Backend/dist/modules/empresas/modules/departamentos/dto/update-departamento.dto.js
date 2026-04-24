"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDepartamentoDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_departamento_dto_1 = require("./create-departamento.dto");
class UpdateDepartamentoDto extends (0, mapped_types_1.PartialType)(create_departamento_dto_1.CreateDepartamentoDto) {
}
exports.UpdateDepartamentoDto = UpdateDepartamentoDto;
//# sourceMappingURL=update-departamento.dto.js.map