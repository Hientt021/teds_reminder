const endpoints = {
  login: "POST /api/v1/auth/login",
  register: "POST /api/v1/auth/register",
  refresh: "GET /api/v1/auth/refresh",
  logout: "GET /api/v1/auth/logout",
  getMe: "GET /api/v1/user/me",

  createProject: "POST /api/v1/project",
  getProjects: "GET /api/v1/project",
  getProjectDetails: "GET /api/v1/project/:project_id",
  updateProject: "PUT /api/v1/project/:project_id",
  deleteProject: "DELETE /api/v1/project/:project_id",

  getProjectTasks: "GET /api/v1/project/:project_id/task",
  createProjectTask: "POST /api/v1/project/:project_id/task",
  getTaskDetails: "GET /api/v1/project/:project_id/task/:task_id",
  updateTask: "PUT /api/v1/project/:project_id/task/:task_id",
  deleteTask: "DELETE /api/v1/project/:project_id/task/:task_id",
};

export default endpoints;
