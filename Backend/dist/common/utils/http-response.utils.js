"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundRes = exports.BadRequestRes = exports.CreatedRes = exports.OkRes = void 0;
const common_1 = require("@nestjs/common");
const OkRes = (res, object) => {
    return res.status(common_1.HttpStatus.OK).json(object);
};
exports.OkRes = OkRes;
const CreatedRes = (res, object) => {
    return res.status(common_1.HttpStatus.CREATED).json(object);
};
exports.CreatedRes = CreatedRes;
const BadRequestRes = (res, object) => {
    return res.status(common_1.HttpStatus.BAD_REQUEST).json(object);
};
exports.BadRequestRes = BadRequestRes;
const NotFoundRes = (res, object) => {
    return res.status(common_1.HttpStatus.NOT_FOUND).json(object);
};
exports.NotFoundRes = NotFoundRes;
//# sourceMappingURL=http-response.utils.js.map