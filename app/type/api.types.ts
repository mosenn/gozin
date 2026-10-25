
export type ApiError = {
  status: number;
  data: {
    message: string;
    statusCode?: number;
    success?: boolean;
    timestamp?: string;
  };
};
