"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMunicipioDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_municipio_dto_1 = require("./create-municipio.dto");
class UpdateMunicipioDto extends (0, mapped_types_1.PartialType)(create_municipio_dto_1.CreateMunicipioDto) {
}
exports.UpdateMunicipioDto = UpdateMunicipioDto;
//# sourceMappingURL=update-municipio.dto.js.map