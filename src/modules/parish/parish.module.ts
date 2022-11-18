import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParishController } from './parish.controller';
import { Parish } from './parish.entity';
import { ParishService } from './parish.service';

@Module({
  imports: [TypeOrmModule.forFeature([Parish])],
  controllers: [ParishController],
  providers: [ParishService],
  exports: [ParishService],
})
export class ParishModule {}
