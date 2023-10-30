type ExperiencePageProps = { params: { historyId: string } };
type GetHistoryProps = { historyId: number };
type GetHistoriesProps = { currentUserId: string };
type GetOnProgressTripProps = { currentUserId: string };
type HistoriesFilterItemProps = { title: string };
type RootLayoutProps = { children: React.ReactNode };
type RatingFeedback = { text: string; color: string };
type RatedProps = Pick<HistoryItemProps, "star" | "review">;
type UseExperienceParams = { historyId: number };

type GenerateResponseOutput<T> = {
  isError: boolean;
  message: string | null;
  data: T;
};

type ExperienceHeaderProps = {
  isFetchingExperience: boolean;
  destinationName?: string | null;
  createdAt?: Date | null;
};

type ExperienceRatingProps = {
  userRating: number;
  setUserRating: (rating: number) => void;
  isFetchingExperience: boolean;
};

type ExperienceReviewProps = {
  userReview: string;
  setUserReview: (review: string) => void;
};

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

interface HistoryItemProps {
  status: string;
  historyId: number;
  created_at: Date;
  destination: string;
  review: string | null;
  star: number | null;
}

interface RatingProps extends HistoryItemProps {}

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

type Directions = {
  distance: string;
  duration: number;
  coords: number[][];
};

type TripDetails = {
  tripId: number | null;
  destinationName: string;
  destinationLatitude: number;
  destinationLongitude: number;
  tripDistance: string;
  tripDuration: number;
  coordsToDestination: number[][];
};

type CreateTripDetails = {
  tripId: number | null;
  destination: Destination;
  userCurrentCoordinate: LatLng;
  directions?: Directions;
};

type Destination = {
  id: number;
  name: string;
  longitude: number;
  latitude: number;
};

type GetRouteProps = {
  startLatitude: number;
  startLongitude: number;
  destinationLongitude: number;
  destinationLatitude: number;
};
