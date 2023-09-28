import { Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { type RatingFeedback } from "./experience";

type StarsProps = {
  amount: number | null;
  onAmountChange: (starIndex: number) => void;
  setRatingFeedback: (params: RatingFeedback) => void;
};

export default function Stars({
  amount = null,
  onAmountChange,
  setRatingFeedback,
}: StarsProps) {
  const [starAmount, setStarAmount] = useState(0);
  const ratingFeedback = useMemo(() => {
    return new Map<number, RatingFeedback>()
      .set(1, { text: "Kecewa.", color: "text-red-600" })
      .set(2, { text: "Kurang Memuaskan.", color: "text-red-600" })
      .set(3, { text: "Biasa.", color: "" })
      .set(4, { text: "Puaaas!", color: "text-green-600" })
      .set(5, { text: "Puas Banget!", color: "text-green-600" });
  }, []);

  const handleOnClick = (starIndex: number) => setStarAmount(starIndex);
  const fillStars = (starIndex: number): string | undefined => {
    if (starIndex <= starAmount) return "fill-yellow-300 stroke-yellow-600";
    return "fill-slate-300 stroke-slate-300";
  };

  useEffect(() => {
    if (amount !== null) {
      setStarAmount(amount);
      setRatingFeedback(ratingFeedback.get(amount)!);
    }
  }, [amount, setRatingFeedback, ratingFeedback]);

  return (
    <div className="flex cursor-pointer justify-between gap-3">
      {Array.from({ length: 5 }, (_, index) => index + 1).map(
        (value: number) => (
          <Star
            size={28}
            key={`star-${value}`}
            className={fillStars(value)}
            onClick={() => {
              onAmountChange(value);
              setRatingFeedback(ratingFeedback.get(value)!);
              handleOnClick(value);
            }}
          />
        ),
      )}
    </div>
  );
}
