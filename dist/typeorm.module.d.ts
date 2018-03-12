import { DynamicModule } from '@nestjs/common';
import { ConnectionOptions } from 'typeorm';
export declare class TypeOrmModule {
    static forRoot(options?: ConnectionOptions): DynamicModule;
    static forFeature(entities?: Function[]): DynamicModule;
}
