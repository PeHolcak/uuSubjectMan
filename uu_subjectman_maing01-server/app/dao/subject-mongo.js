"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class SubjectMongo extends UuObjectDao {

  async createSchema(){
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
    await super.createIndex({ awid: 1, code: 1 }, { unique: true });
  }

  async create(subject) {
    return await super.insertOne(subject);
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

  async update(awid, id, subject) {
    let updateFilter = {
      awid,
      id,
    };
    return await super.findOneAndUpdate(updateFilter, subject, "NONE");
  }


  async list(awid, dtoIn) {
    let listFilter = {
      awid
    };
   const sortingType = dtoIn.order === "desc" ? -1 : 1;
   const sortObj = {};
    
    if(dtoIn.groupByStudyProgramme === "true")
    {
       sortObj.degreeOfStudy = 1;
    }

    if(dtoIn.sortBy === "name"){
      sortObj.name = sortingType;
    }else if(dtoIn.sortBy === "code"){
      sortObj.code = sortingType;
    }
    return (await super.find(listFilter, dtoIn.pageInfo, {...sortObj})||{}).itemList;
  }

}

module.exports = SubjectMongo;
