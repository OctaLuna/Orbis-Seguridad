"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePremioDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_premio_dto_1 = require("./create-premio.dto");
class UpdatePremioDto extends (0, mapped_types_1.PartialType)(create_premio_dto_1.CreatePremioDto) {
}
exports.UpdatePremioDto = UpdatePremioDto;
//# sourceMappingURL=update-premio.dto.js.map