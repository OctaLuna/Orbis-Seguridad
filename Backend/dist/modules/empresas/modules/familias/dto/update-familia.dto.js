"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFamiliaDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_familia_dto_1 = require("./create-familia.dto");
class UpdateFamiliaDto extends (0, mapped_types_1.PartialType)(create_familia_dto_1.CreateFamiliaDto) {
}
exports.UpdateFamiliaDto = UpdateFamiliaDto;
//# sourceMappingURL=update-familia.dto.js.map