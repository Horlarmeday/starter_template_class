import Controller from './Controller';
import PostService from '../services/postService';
import Post from '../models/post';

const postService = new PostService(new Post().getInstance());

class PostController extends Controller {}

export default new PostController(postService);
