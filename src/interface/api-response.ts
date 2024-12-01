export interface IApiResponse<T> {
  status: boolean;
  path: string;
  statusCode: number;
  message: string;
  data: T | null;
  timestamp: string;
}
