import * as Repositories from "../repositories";
import * as Services from "../services";

const app = container({
  ...Services,
  ...Repositories,
});

export default app;
