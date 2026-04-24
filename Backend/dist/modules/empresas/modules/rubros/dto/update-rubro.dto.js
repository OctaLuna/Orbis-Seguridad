"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRubroDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_rubro_dto_1 = require("./create-rubro.dto");
class UpdateRubroDto extends (0, mapped_types_1.PartialType)(create_rubro_dto_1.CreateRubroDto) {
}
exports.UpdateRubroDto = UpdateRubroDto;
//# sourceMappingURL=update-rubro.dto.js.map