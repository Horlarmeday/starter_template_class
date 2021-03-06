import Controller from './Controller';
import UserService from '../services/userService';
import User from '../models/user';

const userService = new UserService(new User().getInstance());

class UserController extends Controller {}

export default new UserController(userService);
