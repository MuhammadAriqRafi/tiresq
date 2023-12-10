import { tripStore } from "@/lib/store/trip-store";
import Mapbox, {
  Marker,
  GeolocateControl,
  NavigationControl,
} from "react-map-gl";
import MapsDestination from "./maps-destination";
import useMaps from "@/app/_hooks/use-maps";

export default function Maps({
  userCurrentCoordinate,
  isGeolocationPermitted,
}: MapsProps) {
  const [trip] = tripStore(({ trip }) => [trip]);
  const { mapViewState, setMapViewState, geolocateControlRef } = useMaps({
    userCurrentCoordinate,
  });

  return (
    <Mapbox
      {...mapViewState}
      style={{ height: "100vh", width: "100vw" }}
      onMove={(event) => setMapViewState(event.viewState)}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      reuseMaps={true}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
    >
      <MapsDestination trip={trip} />
      <GeolocateControl
        ref={geolocateControlRef}
        position="bottom-right"
        trackUserLocation={false}
        showAccuracyCircle={false}
        fitBoundsOptions={{ zoom: 15 }}
        positionOptions={{ enableHighAccuracy: true }}
        style={{ position: "fixed", bottom: 184, right: 8 }}
        onGeolocate={(event) =>
          setMapViewState((prevState) => ({
            ...prevState,
            latitude: event.coords.latitude,
            longitude: event.coords.longitude,
          }))
        }
      />
      <NavigationControl
        position="bottom-right"
        style={{ position: "fixed", bottom: 88, right: 8 }}
      />

      {isGeolocationPermitted ? (
        <Marker
          latitude={userCurrentCoordinate.latitude}
          longitude={userCurrentCoordinate.longitude}
        />
      ) : null}
    </Mapbox>
  );
}
