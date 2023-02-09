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
        image: 'https://i.imgur.com/9wWmRIs.png',
      },
      {
        name: 'Tigre',
        image: 'https://i.imgur.com/ZmorAjM.png',
      },
      {
        name: 'Vaca',
        image: 'https://i.imgur.com/9Ljx3ic.png',
      },
      {
        name: 'Conejo',
        image: 'https://i.imgur.com/DhO8Lsl.png',
      },
      {
        name: 'León',
        image: 'https://i.imgur.com/5gUcRdC.png',
      },
      {
        name: 'Mono',
        image: 'https://i.imgur.com/VhgyYXW.png',
      },
      {
        name: 'LLama',
        image: 'https://i.imgur.com/VDwPqyq.png',
      },
      {
        name: 'Pantera',
        image: 'https://i.imgur.com/eY3jppP.png',
      },
      {
        name: 'Pollo',
        image: 'https://i.imgur.com/dLY96Jb.png',
      },
      {
        name: 'Cerdo',
        image: 'https://i.imgur.com/3r8pmiJ.png',
      },
    ];

    for (const animal of data) {
      await this.littleAnimalService.create(animal.name, animal.image);
    }
  }
}
