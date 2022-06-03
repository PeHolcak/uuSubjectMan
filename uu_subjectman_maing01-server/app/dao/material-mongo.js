"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class MaterialMongo extends UuObjectDao {

  async createSchema() {
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
  }

  async getById(awid, id) {
    let filter = {
      awid,
      id,
    };
    return await super.findOne(filter);
  }

  async getByCode(awid, code) {
    let filter = {
      awid,
      code: code,
    };
    return await super.findOne(filter);
  }

  async getByCode(awid, code) {
    let filter = {
      awid,
      code,
    };
    return await super.findOne(filter);
  }

  async delete(awid, id) {
    let deleteFilter = {
      awid,
      id,
    };
    return await super.deleteOne(deleteFilter);
  }

  async create(material) {
    return await super.insertOne(material);
  }


  async list(awid, pageInfo, sortBy, order) {
    let listFilter = {
      awid
    };
    let sort = {};
    sort[sortBy] = order === "asc" ? 1 : -1;

    return await super.find(listFilter, pageInfo, sort);
  }
}

module.exports = MaterialMongo;
