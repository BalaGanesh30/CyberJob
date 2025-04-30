import express from "express";

import userRoute from "./userRoute.js";
import jobRoute from "./jobRoute.js";

const router = express.Router();

const routes = [
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/job",
    route: jobRoute,
  },
];

routes.forEach((r) => {
  router.use(r.path, r.route);
});

export default router;
