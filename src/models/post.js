/* eslint-disable func-names */
/* eslint-disable class-methods-use-this */
import mongoose, { Schema } from 'mongoose';

class Post {
  initSchema() {
    const schema = new Schema(
      {
        title: {
          type: String,
          required: true,
        },
        subtitle: {
          type: String,
          required: false,
        },
        description: {
          type: String,
          required: false,
        },
        content: {
          type: String,
          required: true,
        },
      },
      { timestamps: true }
    );
    schema.pre('save', function(next) {
      const post = this;
      if (!post.isModified('title')) {
        return next();
      }
      return next();
    });

    mongoose.model('posts', schema);
  }

  getInstance() {
    this.initSchema();
    return mongoose.model('posts');
  }
}

export default Post;
