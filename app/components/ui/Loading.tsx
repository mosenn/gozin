import { BeatLoader } from "react-spinners";

export default function Loading() {
  return <div className="bg-red text-center p-4 m-4">
    <BeatLoader
      size={16}
      color="purple"
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  </div>;
}