// Google Maps TypeScript declarations
declare global {
  interface Window {
    google: typeof google;
  }

  namespace google {
    namespace maps {
      class Map {
        constructor(mapDiv: Element, opts?: MapOptions);
        setCenter(latLng: LatLng | LatLngLiteral): void;
        setZoom(zoom: number): void;
        addListener(eventName: string, handler: Function): MapsEventListener;
      }

      class Marker {
        constructor(opts?: MarkerOptions);
        setPosition(latlng: LatLng | LatLngLiteral): void;
        getPosition(): LatLng | undefined;
        addListener(eventName: string, handler: Function): MapsEventListener;
        setMap(map: Map | null): void;
      }

      class LatLng {
        lat(): number;
        lng(): number;
      }

      class Geocoder {
        geocode(
          request: GeocoderRequest,
          callback: (
            results: GeocoderResult[] | null,
            status: GeocoderStatus
          ) => void
        ): void;
      }

      interface LatLngLiteral {
        lat: number;
        lng: number;
      }

      interface MapOptions {
        center?: LatLng | LatLngLiteral;
        zoom?: number;
        styles?: MapTypeStyle[];
      }

      interface MarkerOptions {
        position?: LatLng | LatLngLiteral;
        map?: Map;
        draggable?: boolean;
        title?: string;
      }

      interface MapMouseEvent {
        latLng: LatLng | null;
      }

      interface MapsEventListener {
        remove(): void;
      }

      interface MapTypeStyle {
        featureType?: string;
        elementType?: string;
        stylers?: Array<{ [key: string]: string }>;
      }

      interface GeocoderRequest {
        location?: LatLng | LatLngLiteral;
        address?: string;
      }

      interface GeocoderResult {
        formatted_address: string;
        address_components?: GeocoderAddressComponent[];
      }

      interface GeocoderAddressComponent {
        long_name: string;
        short_name: string;
        types: string[];
      }

      type GeocoderStatus = string;

      namespace places {
        class Autocomplete {
          constructor(
            inputField: HTMLInputElement,
            opts?: AutocompleteOptions
          );
          addListener(eventName: string, handler: Function): MapsEventListener;
          getPlace(): PlaceResult;
        }

        interface AutocompleteOptions {
          types?: string[];
          componentRestrictions?: ComponentRestrictions;
        }

        interface ComponentRestrictions {
          country?: string | string[];
        }

        interface PlaceResult {
          formatted_address?: string;
          geometry?: {
            location: LatLng;
          };
        }
      }
    }
  }
}

export {};
