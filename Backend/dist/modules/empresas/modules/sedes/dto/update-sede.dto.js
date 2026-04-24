"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSedeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_sede_dto_1 = require("./create-sede.dto");
class UpdateSedeDto extends (0, mapped_types_1.PartialType)(create_sede_dto_1.CreateSedeDto) {
}
exports.UpdateSedeDto = UpdateSedeDto;
//# sourceMappingURL=update-sede.dto.js.map