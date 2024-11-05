import { GridLayer, LatLngBounds, Layer } from 'leaflet';

export interface GeoRasterLayer extends GridLayer {
  getBounds(): LatLngBounds;
}

export interface GeoJSONLayer extends Layer {
  getBounds(): LatLngBounds;
}
