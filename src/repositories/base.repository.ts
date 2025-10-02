import {
  Document,
  FilterQuery,
  Model,
  PopulateOptions,
  Types,
  UpdateQuery,
} from "mongoose";
import { number } from "zod";

export abstract class BaseRepository<T extends Document> {
  constructor(protected model: Model<T>) {}

  async findAll(populate?: PopulateOptions | PopulateOptions[]): Promise<T[]> {
    const query = this.model.find();
    if (populate) {
      query.populate(populate);
    }
    return query.exec();
  }

  async findById(
    id: Types.ObjectId | string,
    populate?: PopulateOptions | PopulateOptions[]
  ): Promise<T | null> {
    const query = this.model.findById(id);
    if (populate) {
      query.populate(populate);
    }
    return query.exec();
  }

  async find(
    filter: FilterQuery<T>,
    populate?: PopulateOptions | PopulateOptions[]
  ): Promise<T[]> {
    const query = this.model.find(filter);
    if (populate) {
      query.populate(populate);
    }
    return query.exec();
  }

  async findOne(
    filter: FilterQuery<T>,
    populate?: PopulateOptions | PopulateOptions[]
  ): Promise<T | null> {
    const query = this.model.findOne(filter);
    if (populate) {
      query.populate(populate);
    }
    return query.exec();
  }

  async create(data: Partial<T>): Promise<T> {
    const document = new this.model(data);
    return document.save();
  }

  async findByIdAndUpdate(
    id: Types.ObjectId | string,
    update: UpdateQuery<T>,
    populate?: PopulateOptions | PopulateOptions[]
  ): Promise<T | null> {
    const query = this.model.findByIdAndUpdate(id, update, { new: true });
    if (populate) {
      query.populate(populate);
    }
    return query.exec();
  }

  async delete(id: Types.ObjectId | string): Promise<T | null> {
    return this.model.findByIdAndDelete(id).exec();
  }

  async findAndpaginate(
    filterOptions: FilterQuery<T> = {},
    page?: number,
    limit?: number,
    populate?: PopulateOptions | PopulateOptions[]
  ): Promise<T[]> {
    const safePage = page || 1;
    const safeLimit = limit || 10;

    const skip = (safePage - 1) * safeLimit;
    const query = this.model
      .find(filterOptions)
      .skip(skip)
      .limit(safeLimit)
      .sort({ createdAt: -1 });

    if (populate) {
      query.populate(populate);
    }

    return query.exec();
  }

  async count(filter: FilterQuery<T> = {}): Promise<number> {
    return this.model.countDocuments(filter);
  }
}
