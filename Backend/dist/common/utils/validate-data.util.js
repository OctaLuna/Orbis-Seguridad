"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateData = validateData;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
function validateData(dtoClass, data) {
    const dto = (0, class_transformer_1.plainToInstance)(dtoClass, data);
    const errores = (0, class_validator_1.validateSync)(dto, {
        whitelist: true,
        forbidNonWhitelisted: true,
    });
    if (errores.length > 0) {
        const mensajes = errores
            .map(e => Object.values(e.constraints || {}))
            .flat();
        throw new common_1.BadRequestException(mensajes);
    }
}
//# sourceMappingURL=validate-data.util.js.map