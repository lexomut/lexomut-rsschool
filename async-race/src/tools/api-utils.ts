interface UrlConfig {
  path: string;
  method:string;
  options: {}[];

}

export const api = {
  url: 'http://',

  config: {
    method: 'GET',
    path: '',
    options: [{}, {}],
  },

  getFetch(resolve: (arg: []) => void, reject: (arg: number) => void) {


    const request = fetch(api.url, { method: api.config.method});
    request.then((response) => {
      if (!response.ok) {
        reject(response.status); // return
      }

      return response.json();
    }).then((data) => {
      resolve(data);
    }, (status) => {
      reject(status);
    });
  },

  getApi(config: UrlConfig) {
    this.config = config;
    this.config.method = config.method;

    this.makeUrl();

    return new Promise(this.getFetch);
  },

  makeUrl() {
    const urlPath = this.config.path;
    const urlOptions = this.config.options.map((item) => {
      const key: string = Object.keys(item)[0];
      return `${key}=${Object.values(item)[0]}`;
    }).join('&');
    this.url = `http://localhost:3000/${this.config.method === 'DELETE' ? (`:${this.config.options[0]}`) : `${urlPath}?${urlOptions}`}`;
    console.log('прошло'+`${urlPath}?${urlOptions}`);
  },

};
