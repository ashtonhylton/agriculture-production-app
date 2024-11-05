import { AfterViewInit, Component, Input } from '@angular/core';
import leaftlet, {
  Control,
  DomUtil,
  LeafletEvent,
  Map,
  MapOptions,
  GeoJSON,
  PathOptions,
} from 'leaflet';
import type { Feature } from 'geojson';
import { GeoJSONLayer, GeoRasterLayer } from '../../models/geo-leaflet.model';
import {
  GeoJSONData,
  CountryLevelCassavaProduction,
} from '../../models/map-legend.model';
import { BehaviorSubject, map } from 'rxjs';
import {
  PRODUCTION_MAP_KEY_COLOUR,
  PRODUCTION_MAP_KEY_MAX_VALUE,
  PRODUCTION_MAP_KEY_MIN_VALUE,
} from '../../enums/map.enum';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements AfterViewInit {
  @Input({ required: true }) containerId!: string;
  @Input({ required: true }) geoRasterLayer!: GeoRasterLayer;
  @Input() geoJsonData!: GeoJSONData;
  @Input() mapOptions: MapOptions = {
    minZoom: 4,
    zoom: 5,
  };

  private map!: Map;
  private geoJsonLayer!: GeoJSON;
  private infoLayer!: any;
  private currentGeoJsonFeaturesDisplayed: BehaviorSubject<Feature[]> =
    new BehaviorSubject<Feature[]>([]);
  private currentGeoJsonFeaturesDisplayed$ =
    this.currentGeoJsonFeaturesDisplayed.pipe(
      map((features) => {
        this.infoLayer?.update(features);
        return features;
      })
    );

  ngAfterViewInit(): void {
    this.initializeMap(this.containerId, this.mapOptions);
    this.initializeCountryDataInfoBox();
    this.loadGeoRasterLayer();
    this.loadGeoJsonLayer();
    this.loadLegend();
  }

  private initializeMap(containerId: string, mapOptions: MapOptions) {
    this.map = leaftlet.map(containerId, mapOptions);

    leaftlet
      .tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      })
      .addTo(this.map);
  }

  private loadGeoRasterLayer() {
    this.map.fitBounds(this.geoRasterLayer.getBounds());
    this.map.setMaxBounds(this.geoRasterLayer.getBounds());
    this.geoRasterLayer?.addTo(this.map);
  }

  private loadGeoJsonLayer() {
    const pathOptions: PathOptions = {
      weight: 0,
      opacity: 1,
      color: '#000',
      fillOpacity: 0,
    };

    this.geoJsonLayer = leaftlet
      .geoJson(this.geoJsonData, {
        style: pathOptions,
        onEachFeature: (feature: Feature, layer: GeoJSONLayer) => {
          if (this.map.getBounds().intersects(layer?.getBounds())) {
            this.updateCurrentGeoJsonFeaturesList(feature);
          }
        },
      })
      .addTo(this.map);
  }

  private updateCurrentGeoJsonFeaturesList(feature: Feature) {
    this.currentGeoJsonFeaturesDisplayed.next([
      ...this.currentGeoJsonFeaturesDisplayed.getValue(),
      feature,
    ]);
  }

  private initializeCountryDataInfoBox() {
    const countryDataInfoBoxElement = DomUtil.create('table', 'info table');
    const CountryDataInfoBoxControl = Control.extend({
      options: {
        position: 'bottomright',
      },
      initialize: () => {
        this.currentGeoJsonFeaturesDisplayed$.subscribe();
        this.map.on('moveend', this.refreshGeoJsonLayer.bind(this));
      },
      onAdd: (map: Map) => {
        return countryDataInfoBoxElement;
      },
      clear: function () {
        countryDataInfoBoxElement.innerHTML = '';
      },
      update: function (features: Feature[]) {
        let infoBoxCountryContent =
          '<tr><th colspan="2">Country Production Volume (DESC)</th></tr>';

        features
          .sort(
            (a, b) =>
              b?.properties?.['cassava_sum'] - a?.properties?.['cassava_sum']
          )
          .every((feature, index) => {
            const casavaProductionProperties =
              feature?.properties as CountryLevelCassavaProduction;

            infoBoxCountryContent += `<tr class="item">
              <td>${casavaProductionProperties.NAME}</td>
              <td>${casavaProductionProperties.cassava_sum}</td>
            </tr>`;

            if (index === 10) {
              infoBoxCountryContent += `<tr class="item">
                <td class="limit text-center" colspan="2">Limited to Top 10</td>
              </tr>`;
              return false;
            }

            return true;
          });
        countryDataInfoBoxElement.innerHTML = infoBoxCountryContent;
      },
    });

    this.infoLayer = new CountryDataInfoBoxControl();
    this.infoLayer.addTo(this.map);
  }

  private refreshGeoJsonLayer(event: LeafletEvent) {
    this.currentGeoJsonFeaturesDisplayed.next([]);
    this.infoLayer?.clear();
    this.geoJsonLayer?.clearLayers().addData(this.geoJsonData);
  }

  private loadLegend() {
    let legend = new leaftlet.Control({ position: 'bottomleft' });
    let legendContainerElement = leaftlet.DomUtil.create(
      'div',
      'legend-container'
    );

    legendContainerElement.innerHTML = `
    <p class="header">Cassava Production</p>
    <p>Tonnes/km&sup2;</p>
    <ul class="legend">
      <li><i style="background: ${PRODUCTION_MAP_KEY_COLOUR.ZERO}"></i>${PRODUCTION_MAP_KEY_MIN_VALUE.ZERO}</li>
      <li><i style="background: ${PRODUCTION_MAP_KEY_COLOUR.OVER_0}"></i>${PRODUCTION_MAP_KEY_MIN_VALUE.OVER_0} > ${PRODUCTION_MAP_KEY_MAX_VALUE.UNDER_1}</li>
      <li><i style="background: ${PRODUCTION_MAP_KEY_COLOUR.OVER_1}"></i>${PRODUCTION_MAP_KEY_MIN_VALUE.OVER_1} > ${PRODUCTION_MAP_KEY_MAX_VALUE.UNDER_5}</li>
      <li><i style="background: ${PRODUCTION_MAP_KEY_COLOUR.OVER_5}"></i>${PRODUCTION_MAP_KEY_MIN_VALUE.OVER_5} > ${PRODUCTION_MAP_KEY_MAX_VALUE.UNDER_10}</li>
      <li><i style="background: ${PRODUCTION_MAP_KEY_COLOUR.OVER_10}"></i>${PRODUCTION_MAP_KEY_MIN_VALUE.OVER_10} > ${PRODUCTION_MAP_KEY_MAX_VALUE.UNDER_50}</li>
      <li><i style="background: ${PRODUCTION_MAP_KEY_COLOUR.OVER_50}"></i>${PRODUCTION_MAP_KEY_MIN_VALUE.OVER_50} > ${PRODUCTION_MAP_KEY_MAX_VALUE.UNDER_100}</li>
      <li><i style="background: ${PRODUCTION_MAP_KEY_COLOUR.OVER_100}"></i>${PRODUCTION_MAP_KEY_MIN_VALUE.OVER_100} > ${PRODUCTION_MAP_KEY_MAX_VALUE.UNDER_500}</li>
      <li><i style="background: ${PRODUCTION_MAP_KEY_COLOUR.OVER_500}"></i>${PRODUCTION_MAP_KEY_MIN_VALUE.OVER_500} > ${PRODUCTION_MAP_KEY_MAX_VALUE.UNDER_1000}</li>
    </ul>
    `;

    legend.onAdd = () => legendContainerElement;
    legend.addTo(this.map);
  }
}
