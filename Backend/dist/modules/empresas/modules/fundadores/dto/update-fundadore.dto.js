"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFundadoreDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_fundadore_dto_1 = require("./create-fundadore.dto");
class UpdateFundadoreDto extends (0, mapped_types_1.PartialType)(create_fundadore_dto_1.CreateFundadoreDto) {
}
exports.UpdateFundadoreDto = UpdateFundadoreDto;
//# sourceMappingURL=update-fundadore.dto.js.map