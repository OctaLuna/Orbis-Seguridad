"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmpresaNotFoundException = void 0;
const common_1 = require("@nestjs/common");
class EmpresaNotFoundException extends common_1.NotFoundException {
    constructor(idEmpresa) {
        super({
            message: `La empresa con id = ${idEmpresa} non existe`
        });
    }
}
exports.EmpresaNotFoundException = EmpresaNotFoundException;
//# sourceMappingURL=empresa-not-found.exception.js.map