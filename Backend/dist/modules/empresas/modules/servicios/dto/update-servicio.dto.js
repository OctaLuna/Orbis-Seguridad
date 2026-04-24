"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateServicioDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_servicio_dto_1 = require("./create-servicio.dto");
class UpdateServicioDto extends (0, swagger_1.PartialType)(create_servicio_dto_1.CreateServicioDto) {
}
exports.UpdateServicioDto = UpdateServicioDto;
//# sourceMappingURL=update-servicio.dto.js.map