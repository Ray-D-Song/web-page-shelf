const result = {
  success<T extends any>(data: T) {
    return {
      code: 200,
      data,
      message: 'success',
    };
  },
  error: (code: number, message: string) => {
    return {
      code,
      message,
    };
  },
};

export default result