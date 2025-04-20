export type ResponseError = {
  success: false;
  message: string;
};

export type ResponseSuccess<T> = {
  success: true;
  message: string;
  data: T;
};
