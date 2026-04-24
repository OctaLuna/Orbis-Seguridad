"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateImageneDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_imagene_dto_1 = require("./create-imagene.dto");
class UpdateImageneDto extends (0, mapped_types_1.PartialType)(create_imagene_dto_1.CreateImageneDto) {
}
exports.UpdateImageneDto = UpdateImageneDto;
//# sourceMappingURL=update-imagene.dto.js.map