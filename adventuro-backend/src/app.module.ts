import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelloWorldModule } from './module/helloWorld.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './module/user.module';
import { PropertyModule } from "./module/property.module";
import {BookingModule} from "./module/booking.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get('DB_HOST') || 'localhost',
                port: configService.get('DB_PORT') || 5306,
                username: configService.get('DB_USERNAME') || 'codegileintern',
                password: configService.get('DB_PASSWORD') || '12345678',
                database: configService.get('DB_NAME') || 'codegile-intern',
                autoLoadEntities: true,
                synchronize: true,
                // cli: {
                //     migrationsDir: 'migration',
                // },
                // migrations: ["migration/*.js"],
            }),
            inject: [ConfigService],
        }),
        HelloWorldModule,
        UserModule,
        PropertyModule,
        BookingModule,
    ],
})
export class AppModule {
}
