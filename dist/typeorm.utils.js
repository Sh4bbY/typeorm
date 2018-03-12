"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const logger = new common_1.Logger('TypeOrm', true);
function getRepositoryToken(entity) {
    return `${entity.name}Repository`;
}
exports.getRepositoryToken = getRepositoryToken;
function attemptConnectionCreation(connectMethod, options, attempt) {
    return __awaiter(this, void 0, void 0, function* () {
        const maxAttempts = 10;
        const connectionAttempt = attempt || 1;
        try {
            return yield connectMethod(options);
        }
        catch (err) {
            logger.error(`Connection Attempt #${connectionAttempt} failed. ${err.toString()}`);
            if (connectionAttempt >= maxAttempts) {
                throw err;
            }
            yield sleep(getIdleTime(connectionAttempt));
            return attemptConnectionCreation(connectMethod, options, connectionAttempt + 1);
        }
    });
}
exports.attemptConnectionCreation = attemptConnectionCreation;
function getIdleTime(attempt) {
    return 1000 * attempt;
}
function sleep(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => setTimeout(resolve, ms));
    });
}
