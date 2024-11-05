import { Feature, GeoJsonObject, GeoJsonTypes } from 'geojson';

export interface ProductionLegendInterface {
  getPixelValueHexColour(pixelValue: number): string;
}

export interface CountryLevelCassavaProduction {
  NAME: string;
  GDP_MD: number;
  POP_EST: number;
  cassava_sum: number;
}

export interface GeoJSONData extends GeoJsonObject {
  type: GeoJsonTypes;
  name: string;
  crs: Crs;
  features: Feature[];
}

interface Crs {
  type: string;
  properties: CRSProperties;
}

interface CRSProperties {
  name: string;
}
