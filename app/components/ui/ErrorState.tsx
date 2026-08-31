

type ErrorStateProps = {
  title?: string;
  message?: string;
  onRetry?: () => void;
};

const DEFAULT_TITLE = "مشکلی پیش آمده است";
const DEFAULT_MESSAGE =
  "در دریافت اطلاعات مشکلی پیش آمد. لطفاً دوباره تلاش کنید.";

export default function ErrorState({
  title = DEFAULT_TITLE,
  message = DEFAULT_MESSAGE,
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center px-6 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
        {/* icon */}
      </div>

      <h2 className="mb-2 text-lg font-semibold text-gray-900">
        {title}
      </h2>

      <p className="mb-6 max-w-md text-sm leading-6 text-gray-500">
        {message}
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
        >
          {/* icon */}
          تلاش مجدد
        </button>
      )}
    </div>
  );
}

{/* <ErrorState
  title="دریافت لیست‌ها ناموفق بود"
  message="لطفاً دوباره تلاش کنید."
  onRetry={refetch}
/> */}