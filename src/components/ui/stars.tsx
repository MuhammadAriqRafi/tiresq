import { Star } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  amount: number | null;
  onAmountChange: (starIndex: number) => void;
};

export default function Stars({ amount = null, onAmountChange }: Props) {
  const [starAmount, setStarAmount] = useState(0);

  useEffect(() => {
    if (amount !== null) setStarAmount(amount);
  }, [amount]);

  const handleOnClick = (starIndex: number) => setStarAmount(starIndex);
  const fillStars = (starIndex: number): string | undefined => {
    if (starIndex <= starAmount) return "fill-yellow-300 stroke-yellow-600";
    return undefined;
  };

  return (
    <div className="flex cursor-pointer justify-between gap-3">
      {Array.from({ length: 5 }, (_, index) => index + 1).map(
        (value: number) => (
          <Star
            size={24}
            key={`star-${value}`}
            className={fillStars(value)}
            onClick={() => {
              onAmountChange(value);
              handleOnClick(value);
            }}
          />
        )
      )}
    </div>
  );
}
