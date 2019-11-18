/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';
import winston from 'winston';

class Service {
  constructor(model) {
    this.model = model;
    this.getAll = this.getAll.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async getAll(query) {
    let { skip, limit } = query;

    skip = skip ? Number(skip) : 0;
    limit = limit ? Number(limit) : 10;

    delete query.skip;
    delete query.limit;

    if (query._id) {
      try {
        query._id = new mongoose.mongo.ObjectId(query._id);
      } catch (error) {
        winston.error('not able to generate mongoose id with content', query._id);
      }
    }

    try {
      const items = await this.model
        .find(query)
        .skip(skip)
        .limit(limit);
      const total = await this.model.count();

      return {
        error: false,
        statusCode: 200,
        data: items,
        total,
      };
    } catch (errors) {
      return {
        error: true,
        statusCode: 500,
        errors,
      };
    }
  }

  // eslint-disable-next-line consistent-return
  async insert(data) {
    try {
      const item = await this.model.create(data);
      if (item)
        return {
          error: false,
          item,
        };
    } catch (error) {
      winston.error('error', error);
      return {
        error: true,
        statusCode: 500,
        message: error.errmsg || 'Not able to create item',
        errors: error.errors,
      };
    }
  }

  async update(id, data) {
    try {
      const item = await this.model.findByIdAndUpdate(id, data, { new: true });
      return {
        error: false,
        statusCode: 202,
        item,
      };
    } catch (error) {
      return {
        error: true,
        statusCode: 500,
        message: error.message,
      };
    }
  }

  async delete(id) {
    try {
      const item = await this.model.findByIdAndDelete(id);
      if (!item)
        return {
          error: true,
          statusCode: 404,
          message: 'item not found',
        };

      return {
        error: false,
        deleted: true,
        statusCode: 202,
        item,
      };
    } catch (error) {
      return {
        error: true,
        statusCode: 500,
        message: error.message,
      };
    }
  }
}

export default Service;
