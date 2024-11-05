import { Component } from '@angular/core';
import { MapComponent } from '../../components/map/map.component';
import { GeotiffService } from '../../services/geotiff.service';
import { CommonModule } from '@angular/common';
import { GeoJsonService } from '../../services/geo-json.service';
import { GeoRasterLayer } from '../../models/geo-leaflet.model';
import { GeoJSONData } from '../../models/map-legend.model';

@Component({
  selector: 'app-cassava',
  standalone: true,
  imports: [CommonModule, MapComponent],
  templateUrl: './cassava.component.html',
})
export class CassavaComponent {
  public geoRasterLayer!: GeoRasterLayer;
  public geoJsonData!: GeoJSONData;

  constructor(
    private geotiffService: GeotiffService,
    private geoJsonService: GeoJsonService
  ) {
    const geoTiffFilename = 'CassavaMap_Prod_v1.tif';
    const geoJsonFilename = 'country_level_cassava_production.geojson';

    Promise.all([
      this.geotiffService.getGeoRasterLayer(geoTiffFilename),
      this.geoJsonService.getGeoJson(geoJsonFilename),
    ]).then(([geoRasterLayer, geoJsonData]) => {
      this.geoRasterLayer = geoRasterLayer;
      this.geoJsonData = geoJsonData;
    });
  }
}
