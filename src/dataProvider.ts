import fakeRestDataProvider from "ra-data-fakerest";
import generateData from "data-generator-retail";

const rootProvider = fakeRestDataProvider(generateData(), true);

const delayedDataProvider = new Proxy(rootProvider, {
  get(target, propKey) {
    return (...args) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(target[propKey](...args));
        }, 2000);
      });
    };
  },
});

export const dataProvider = delayedDataProvider;
