"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProyectoDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_proyecto_dto_1 = require("./create-proyecto.dto");
class UpdateProyectoDto extends (0, mapped_types_1.PartialType)(create_proyecto_dto_1.CreateProyectoDto) {
}
exports.UpdateProyectoDto = UpdateProyectoDto;
//# sourceMappingURL=update-proyecto.dto.js.map