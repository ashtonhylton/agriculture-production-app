import { Injectable } from '@angular/core';
import { GeoJSONData } from '../models/map-legend.model';


@Injectable({
  providedIn: 'root',
})
export class GeoJsonService {
  constructor() {}

  async getGeoJson(filename: string): Promise<GeoJSONData> {
    const response = await fetch(filename);
    const jsonData = await response.json();

    return jsonData;
  }
}
