"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_utils_1 = require("./typeorm.utils");
exports.InjectRepository = (entity) => common_1.Inject(typeorm_utils_1.getRepositoryToken(entity));
