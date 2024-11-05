import { Injectable } from '@angular/core';
import ParseGeoRaster from 'georaster';
import GeoRasterLayer from 'georaster-layer-for-leaflet';
import { CassavaProductionLegendService } from './cassava-production-legend.service';
import { GeoRasterLayer as GeoRasterLayerInterface } from '../models/geo-leaflet.model';

@Injectable({
  providedIn: 'root',
})
export class GeotiffService {
  constructor(
    private productionLegendService: CassavaProductionLegendService
  ) {}

  private async getGeotiffBuffer(fileName: string): Promise<ArrayBuffer> {
    const response = await fetch(fileName);
    const arrayBuffer = await response.arrayBuffer();
    return arrayBuffer;
  }

  async getGeoRasterLayer(
    geoTiffFileName: string
  ): Promise<GeoRasterLayerInterface> {
    const geoTiffBuffer = await this.getGeotiffBuffer(geoTiffFileName);
    const geoRaster = await ParseGeoRaster(geoTiffBuffer);

    return new GeoRasterLayer({
      georaster: geoRaster,
      opacity: 0.7,
      pixelValuesToColorFn: (pixelValue: any) => {
        return this.productionLegendService.getPixelValueHexColour(
          pixelValue[0]
        );
      },
      resolution: 512,
    });
  }
}
