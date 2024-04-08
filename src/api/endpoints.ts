const endpoints = {
  login: "POST /api/v1/auth/login",
  register: "POST /api/v1/auth/register",
  refresh: "GET /api/v1/auth/refresh",
  logout: "GET /api/v1/auth/logout",
  getMe: "GET /api/v1/user/me",
  getTasks: "GET /api/v1/task",
  createTask: "POST /api/v1/task",
  getProjects: "GET /api/v1/project",
  createProject: "POST /api/v1/project",
};

export default endpoints;
