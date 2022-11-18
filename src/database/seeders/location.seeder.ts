import { Injectable, Logger } from '@nestjs/common';
import * as locationData from '@/common/data/location.json';
import { StateService } from '@/modules/state/state.service';

@Injectable()
export class LocationSeeder {
  constructor(
    private readonly logger: Logger,
    private readonly stateService: StateService,
  ) {}
  async seed() {
    await this.handle()
      .then((completed) => {
        this.logger.debug('Successfully completed seeding locations...');
        Promise.resolve(completed);
      })
      .catch((error) => {
        this.logger.error('Failed seeding locations...');
        Promise.reject(error);
      });
  }
  async handle() {
    const jsonData = locationData.map((state) => {
      return {
        name: state.name,
        municipalities: state.municipalities.map((municipality) => {
          return {
            name: municipality.name,
            parishes: municipality.parishes.map((parish) => {
              return {
                name: parish,
              };
            }),
          };
        }),
      };
    });

    this.logger.debug(jsonData);
    //this.logger.debug(jsonData);
    for (const state of jsonData) {
      await this.stateService.save(state);
    }
  }
}
