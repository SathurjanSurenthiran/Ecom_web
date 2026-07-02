class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  filter() {
    const queryObj = { ...this.queryStr };
    const excludedFields = ['page', 'sort', 'limit', 'fields', 'search'];
    excludedFields.forEach((el) => delete queryObj[el]);
    Object.keys(queryObj).forEach((key) => {
      if (queryObj[key] === '' || queryObj[key] === null || queryObj[key] === undefined) {
        delete queryObj[key];
      }
    });

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  search() {
    if (this.queryStr.search) {
      const searchQuery = {
        $or: [
          { name: { $regex: this.queryStr.search, $options: 'i' } },
          { description: { $regex: this.queryStr.search, $options: 'i' } },
          { brand: { $regex: this.queryStr.search, $options: 'i' } },
        ],
      };
      this.query = this.query.find(searchQuery);
    }
    return this;
  }

  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    const page = parseInt(this.queryStr.page) || 1;
    const limit = parseInt(this.queryStr.limit) || 10;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }

  getTotalCount() {
    return this.query.model.countDocuments(this.query._conditions);
  }
}

export default APIFeatures;
