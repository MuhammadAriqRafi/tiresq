"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import { useEffect } from "react";
import mapboxgl, { type LngLatLike } from "mapbox-gl";

// @ts-ignore
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.js";

type Postion = {
	coords: {
		latitude: number;
		longitude: number;
	};
};

export default function Home() {
	useEffect(() => {
		navigator.geolocation.getCurrentPosition(onSuccess, onError, {
			enableHighAccuracy: true,
		});

		function onSuccess({ coords: { latitude, longitude } }: Postion) {
			const currentPosition: LngLatLike = [longitude, latitude];
			mapboxgl.accessToken = process.env
				.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

			const map = new mapboxgl.Map({
				container: "map",
				center: currentPosition,
				style: "mapbox://styles/mapbox/streets-v12",
				zoom: 14,
			});

			const navigationControl = new mapboxgl.NavigationControl();
			const geolocationControl = new mapboxgl.GeolocateControl({
				positionOptions: {
					enableHighAccuracy: true,
				},
				trackUserLocation: true,
				showUserHeading: true,
			});

			const directions = new MapboxDirections({
				accessToken: mapboxgl.accessToken,
				profile: "mapbox/walking",
				interactive: false,
				unit: "metric",
				routePadding: { left: 40, right: 40 },
				controls: {
					inputs: false,
					instructions: false,
				},
			});

			map.addControl(directions, "top-left");
			map.addControl(navigationControl, "bottom-right");
			map.addControl(geolocationControl, "bottom-right");
			map.on("load", () => {
				directions.setOrigin(currentPosition);
				directions.setDestination([105.21874913194476, -5.380473977304835]);
			});
		}

		function onError() {}
	}, []);

	return (
		<div
			className="h-[calc(100vh-40px)] md:h-[calc(100vh-58px)] w-screen"
			id="map"
		></div>
	);
}
