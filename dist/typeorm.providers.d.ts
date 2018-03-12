import { Connection } from 'typeorm';
export declare function createTypeOrmProviders(entities?: Function[]): {
    provide: string;
    useFactory: (connection: Connection) => any;
    inject: (typeof Connection)[];
}[];
