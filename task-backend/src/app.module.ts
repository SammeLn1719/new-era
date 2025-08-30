import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TaskModule } from './tasks/task.module';
import { TimeBlockModule } from './time-block/time-block.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule.forRoot({}),
    TaskModule,
    TimeBlockModule,
  ]
})
export class AppModule {}
