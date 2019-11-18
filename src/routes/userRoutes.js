import UserController from '../controller/userController';

export default app => {
  // POST ROUTES
  app.get(`/api/user`, UserController.getAll);
  app.get(`/api/user/:params`, UserController.get);
  app.post(`/api/user`, UserController.insert);
  app.put(`/api/user/:id`, UserController.update);
  app.delete(`/api/user/:id`, UserController.delete);
};
