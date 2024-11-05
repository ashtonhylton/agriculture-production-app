import { Injectable } from '@angular/core';
import {
  PRODUCTION_MAP_KEY_COLOUR,
  PRODUCTION_MAP_KEY_MIN_VALUE,
} from '../enums/map.enum';
import { ProductionLegendInterface } from '../models/map-legend.model';

@Injectable({
  providedIn: 'root',
})
export class CassavaProductionLegendService
  implements ProductionLegendInterface
{
  getPixelValueHexColour(pixelValue: number): PRODUCTION_MAP_KEY_COLOUR {
    switch (true) {
      case pixelValue >= PRODUCTION_MAP_KEY_MIN_VALUE.OVER_500:
        return PRODUCTION_MAP_KEY_COLOUR.OVER_500;
      case pixelValue >= PRODUCTION_MAP_KEY_MIN_VALUE.OVER_100:
        return PRODUCTION_MAP_KEY_COLOUR.OVER_100;
      case pixelValue >= PRODUCTION_MAP_KEY_MIN_VALUE.OVER_50:
        return PRODUCTION_MAP_KEY_COLOUR.OVER_50;
      case pixelValue >= PRODUCTION_MAP_KEY_MIN_VALUE.OVER_10:
        return PRODUCTION_MAP_KEY_COLOUR.OVER_10;
      case pixelValue >= PRODUCTION_MAP_KEY_MIN_VALUE.OVER_5:
        return PRODUCTION_MAP_KEY_COLOUR.OVER_5;
      case pixelValue >= PRODUCTION_MAP_KEY_MIN_VALUE.OVER_1:
        return PRODUCTION_MAP_KEY_COLOUR.OVER_1;
      case pixelValue >= PRODUCTION_MAP_KEY_MIN_VALUE.OVER_0:
        return PRODUCTION_MAP_KEY_COLOUR.OVER_0;
      case pixelValue === PRODUCTION_MAP_KEY_MIN_VALUE.ZERO:
        return PRODUCTION_MAP_KEY_COLOUR.ZERO;
      default:
        return PRODUCTION_MAP_KEY_COLOUR.BLANK;
    }
  }
}
