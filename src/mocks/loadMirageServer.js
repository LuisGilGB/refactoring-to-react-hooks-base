import { sales, subscriptions } from "./index";
import { addLabelToResponseItemsBySerializing } from "../common/utils/mockups";

const loadMirage = () => import("miragejs");

export const loadMirageInDev = () =>
  new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === "development") {
      loadMirage()
        .then(({ createServer }) => {
          resolve(
            createServer({
              routes() {
                this.namespace = process.env.REACT_APP_BASE_URL;

                this.get("/sales/", () =>
                  addLabelToResponseItemsBySerializing(sales)
                );
                this.get("/subscriptions/", () =>
                  addLabelToResponseItemsBySerializing(subscriptions)
                );
              },
            })
          );
        })
        .catch(reject);
    } else {
      resolve();
    }
  });
