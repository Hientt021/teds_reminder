export enum ROUTES {
  LOGIN = "/login",
  REGISTER = "/register",
  DASHBOARD = "/dashboard",
  CALENDAR = "/calendar",
  TASK = "/task",
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
    href: ROUTES.TASK,
    private: true,
  },
];
