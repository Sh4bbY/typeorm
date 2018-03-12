"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const typeorm_utils_1 = require("./typeorm.utils");
function createTypeOrmProviders(entities) {
    const getRepository = (connection, entity) => connection.options.type === 'mongodb'
        ? connection.getMongoRepository(entity)
        : connection.getRepository(entity);
    const repositories = (entities || []).map(entity => ({
        provide: typeorm_utils_1.getRepositoryToken(entity),
        useFactory: (connection) => getRepository(connection, entity),
        inject: [typeorm_1.Connection],
    }));
    return [...repositories];
}
exports.createTypeOrmProviders = createTypeOrmProviders;
