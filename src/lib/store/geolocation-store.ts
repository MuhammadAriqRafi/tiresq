import { create } from "zustand";

type Store = { isGeolocationPermitted: boolean; userCurrentCoordinate: LatLng };
type Actions = {
  setIsGeolocationPermitted: (isPermitted: boolean) => void;
  setUserCurrentCoordinate: (userCurrentCoordinate: LatLng) => void;
};

export const geolocationStore = create<Store & Actions>((set) => ({
  isGeolocationPermitted: false,
  userCurrentCoordinate: {
    latitude: -5.358125429208756,
    longitude: 105.31483876684943,
  }, // I set the default location to Insitute Technology of Sumatera

  setIsGeolocationPermitted: (isPermitted: boolean) =>
    set(() => ({ isGeolocationPermitted: isPermitted })),
  setUserCurrentCoordinate: (userCurrentCoordinate: LatLng) =>
    set(() => ({ userCurrentCoordinate })),
}));
