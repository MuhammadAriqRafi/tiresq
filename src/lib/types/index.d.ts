type GetOnProgressTripParams = { userId: string };
type UseFindNearestTireRepairShopParams = { userCurrentCoordinate: LatLng };
type UseMapsParams = { userCurrentCoordinate: LatLng };
type RootLayoutProps = Readonly<{ children: React.ReactNode }>;
type CancelTripSheetProps = Readonly<{ onCancel: () => void }>;
type CompleteTripSheetProps = Readonly<{ onComplete: () => void }>;
type CompleteTripSheetTrigger = Readonly<{
  onClick: () => void;
  isCompleting: boolean;
}>;

type CancelTripSheetTrigger = Readonly<{
  onClick: () => void;
  isCancelling: boolean;
}>;

type NavItem = {
  href: string;
  title: string;
  icon: React.ReactElement;
};

type LatLng = {
  latitude: number;
  longitude: number;
};

type Position = {
  coords: {
    latitude: number;
    longitude: number;
    accuracy: number;
    altitude: number | null;
    altitudeAccuracy: number | null;
    heading: number | null;
    speed: number | null;
  };
  timestamp: number;
};

type Coords = {
  routes: [
    {
      distance: number;
      duration: number;
      geometry: {
        coordinates: number[][];
      };
    },
  ];
};

type SearchDirectionsParams = {
  startLongitude: number;
  startLatitude: number;
  destinationLongitude: number;
  destinationLatitude: number;
};

type Directions = Prettify<{
  distance: number;
  duration: number;
  coords: number[][];
}>;

type Destination = Prettify<{
  id: number;
  name: string;
  longitude: number;
  latitude: number;
}>;

type CreateTripDetails = {
  tripId: number | null;
  destination: Destination;
  userCurrentCoordinate: LatLng;
  directions?: Directions;
};

type GetRouteProps = {
  startLatitude: number;
  startLongitude: number;
  destinationLongitude: number;
  destinationLatitude: number;
};

type MapViewState = {
  zoom: number;
  longitude: number;
  latitude: number;
};

type MapsProps = Readonly<{
  userCurrentCoordinate: LatLng;
  isGeolocationPermitted: boolean;
}>;
