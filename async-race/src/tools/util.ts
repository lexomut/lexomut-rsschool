const util = {

  delay(ms = 1000) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  },

  // isUndefined(d:unknown) {
  //   return typeof d === 'undefined';
  // },

};
export { util };
