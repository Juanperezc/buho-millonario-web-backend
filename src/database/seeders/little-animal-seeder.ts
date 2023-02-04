import { Injectable, Logger } from '@nestjs/common';
import { LittleAnimalService } from '@/modules/little-animal/little-animal.service';

@Injectable()
export class LittleAnimalSeeder {
  constructor(
    private readonly logger: Logger,
    private readonly littleAnimalService: LittleAnimalService,
  ) {}
  async seed() {
    await this.handle()
      .then((completed) => {
        this.logger.debug('Successfully completed seeding little-animal...');
        Promise.resolve(completed);
      })
      .catch((error) => {
        this.logger.error('Failed seeding little-animal...');
        Promise.reject(error);
      });
  }
  async handle() {
    const data = [
      {
        name: 'Panda',
        image: 'https://i.ibb.co/16z9vRB/oso-panda.png',
      },
      {
        name: 'Tigre',
        image: 'https://i.ibb.co/cL1gX65/tigre.png',
      },
      {
        name: 'Vaca',
        image: 'https://i.ibb.co/df6NYqY/vaca.png',
      },
      {
        name: 'Conejo',
        image: 'https://i.ibb.co/4SJyD0z/conejo.png',
      },
      {
        name: 'León',
        image: 'https://i.ibb.co/qn8hzkP/leon.png',
      },
      {
        name: 'Mono',
        image: 'https://i.ibb.co/1qQ15mh/babuino.png',
      },
      {
        name: 'LLama',
        image: 'https://i.ibb.co/WzL4ZTQ/alpaca.png',
      },
      {
        name: 'Pantera',
        image: 'https://i.ibb.co/TRt9xnc/pantera.png',
      },
      {
        name: 'Pollo',
        image: 'https://i.ibb.co/zPTDbBK/pollo.png',
      },
      {
        name: 'Cerdo',
        image: 'https://i.ibb.co/DK9LXz1/cerdo.png',
      },
    ];

    for (const animal of data) {
      await this.littleAnimalService.create(animal.name, animal.image);
    }
  }
}
