
import styles from "./ErrorState.module.css";

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
    <div className={styles.container}>
      <div className={styles.icon}>
        {/* icon */}
      </div>

      <h2 className={styles.title}>
        {title}
      </h2>

      <p className={styles.message}>
        {message}
      </p>

      {/* {onRetry && ( */}
      <button
        type="button"
        onClick={onRetry}
        className={styles.button}
      >
        {/* icon */}
        تلاش مجدد
      </button>
      {/* )} */}
    </div>
  );
}

{/* <ErrorState
  title="دریافت لیست‌ها ناموفق بود"
  message="لطفاً دوباره تلاش کنید."
  onRetry={refetch}
/> */}