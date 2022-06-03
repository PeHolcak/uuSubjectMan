"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class TopicMongo extends UuObjectDao {

  async createSchema(){
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
    await super.createIndex({ awid: 1, name: 1 }, { unique: true });
  }

  async create(subject) {
    return await super.insertOne(subject);
  }

  async delete(awid, id) {
    return await super.deleteOne({ awid, id });
  }

  async getById(awid, id) {
    let filter = {
      awid: awid,
      id: id,
    };
    return await super.findOne(filter);
  }

  async list(awid, dtoIn) {
    let listFilter = {
      awid
    };
    const sortingType = dtoIn.order === "desc" ? -1 : 1;
   const sortObj = {};

    if(dtoIn.sortByName){
      sortObj.name = sortingType;
    }else if(dtoIn.sortBy === "code"){
      sortObj.code = sortingType;
    }
    return await super.find(listFilter, {}, {...sortObj});
  }

  async update(awid, id, topic) {
    let updateFilter = {
      awid,
      id,
    };
    return await super.findOneAndUpdate(updateFilter, topic, "NONE");
  }

}

module.exports = TopicMongo;
