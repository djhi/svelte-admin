import fakeRestDataProvider from "ra-data-fakerest";
import generateData from "data-generator-retail";

const rootProvider = fakeRestDataProvider(generateData(), true);

export const delayedDataProvider = (delay = 2000) =>
  new Proxy(rootProvider, {
    get(target, propKey) {
      return (...args) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(target[propKey](...args));
          }, delay);
        });
      };
    },
  });
