import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("senior-date", "routes/seniordate.tsx"),
] satisfies RouteConfig;
