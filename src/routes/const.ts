export enum ROUTES {
  LOGIN = "/login",
  REGISTER = "/register",
  DASHBOARD = "/dashboard",
  CALENDAR = "/calendar",
  ORGANIZATIONS = "/organizations",
  PROJECTS = "/projects",
  PROFILE = "/profile",
  SETTINGS = "/settings",
}
export const routes = [
  {
    href: ROUTES.LOGIN,
    private: false,
  },
  {
    href: ROUTES.REGISTER,
    private: false,
  },
  {
    href: ROUTES.DASHBOARD,
    private: true,
  },
  {
    href: ROUTES.CALENDAR,
    private: true,
  },
  {
    href: ROUTES.ORGANIZATIONS,
    private: true,
  },
  {
    href: ROUTES.PROJECTS,
    private: true,
  },
];
