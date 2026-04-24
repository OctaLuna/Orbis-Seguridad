"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAccioneDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_accione_dto_1 = require("./create-accione.dto");
class UpdateAccioneDto extends (0, mapped_types_1.PartialType)(create_accione_dto_1.CreateAccioneDto) {
}
exports.UpdateAccioneDto = UpdateAccioneDto;
//# sourceMappingURL=update-accione.dto.js.map