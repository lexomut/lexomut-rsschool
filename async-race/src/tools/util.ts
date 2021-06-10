const util = {
  delay(ms = 1000) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  },

};
export { util };
