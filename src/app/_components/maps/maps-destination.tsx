import { Fragment } from "react";
import { Layer, Source } from "react-map-gl";
import { type OnProgressTripOutputType } from "@/app/_actions/get-on-progress-trip";

type MapsDestinationProps = Readonly<{
  trip: OnProgressTripOutputType["data"];
}>;

export default function MapsDestination({ trip }: MapsDestinationProps) {
  return (
    <Fragment>
      {trip !== null ? (
        <Fragment>
          <Source
            id="routeSource"
            type="geojson"
            data={{
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  properties: [],
                  geometry: {
                    type: "LineString",
                    coordinates: trip.detail
                      ?.coords_to_destination as number[][],
                  },
                },
              ],
            }}
          >
            <Layer
              id="routeLayer"
              type="line"
              layout={{ "line-join": "round", "line-cap": "round" }}
              paint={{
                "line-color": "#0D1282",
                "line-width": 7,
                "line-opacity": 1,
              }}
            />
          </Source>
          <Source
            id="goalSource"
            type="geojson"
            data={{
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  properties: [],
                  geometry: {
                    type: "Point",
                    coordinates: [
                      Number(trip.destination.longitude),
                      Number(trip.destination.latitude),
                    ],
                  },
                },
              ],
            }}
          >
            <Layer
              id="goalLayer"
              type="circle"
              paint={{
                "circle-radius": 13,
                "circle-color": "#0D1282",
                "circle-opacity": 1,
                "circle-stroke-color": "#EAEAEA",
                "circle-stroke-opacity": 1,
                "circle-stroke-width": 3,
              }}
            />
          </Source>
        </Fragment>
      ) : null}
    </Fragment>
  );
}
