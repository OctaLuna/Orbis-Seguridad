"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEmpresaDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_empresa_dto_1 = require("./create-empresa.dto");
class UpdateEmpresaDto extends (0, mapped_types_1.PartialType)(create_empresa_dto_1.CreateEmpresaDto) {
}
exports.UpdateEmpresaDto = UpdateEmpresaDto;
//# sourceMappingURL=update-empresa.dto.js.map