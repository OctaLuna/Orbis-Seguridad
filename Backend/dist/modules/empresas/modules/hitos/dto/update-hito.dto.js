"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateHitoDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_hito_dto_1 = require("./create-hito.dto");
class UpdateHitoDto extends (0, mapped_types_1.PartialType)(create_hito_dto_1.CreateHitoDto) {
}
exports.UpdateHitoDto = UpdateHitoDto;
//# sourceMappingURL=update-hito.dto.js.map