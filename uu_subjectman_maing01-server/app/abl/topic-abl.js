"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/topic-error.js");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },
  deleteUnsupportedKeys: {
    code: `${Errors.Delete.UC_CODE}unsupportedKeys`,
  },
  getUnsupportedKeys: {
    code: `${Errors.Get.UC_CODE}unsupportedKeys`,
  },
  listUnsupportedKeys: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`,
  },
  updateUnsupportedKeys: {
    code: `${Errors.Update.UC_CODE}unsupportedKeys`,
  }
};

const DEFAULT_VALUES = {
  groupBySubject: false,
  order: "asc",
  pageIndex: 0,
  pageSize: 10,
};

class TopicAbl {

  constructor() {
    this.validator = Validator.load();
    this.topicDao = DaoFactory.getDao("topic");
    this.materialDao = DaoFactory.getDao("material");
  }


  async update(awid, dtoIn) {
    // 1, 1.1

    // 2, 2.1
    let validationResult = this.validator.validate("topicUpdateDtoInType", dtoIn);
    // 2.2, 2.3 
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.updateUnsupportedKeys.code,
      Errors.Update.invalidDtoIn
    );

    // 3
    let isExistingTopicWithId;
    try {
      isExistingTopicWithId = Boolean(await this.topicDao.getById(awid, dtoIn.id));
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Update.DbDoesNotRespond(	{ "cause": e });
      }
      throw e;
    }

    if(!isExistingTopicWithId){
      throw new Errors.Update.topicDoesNotExist({ "subjectId": dtoIn.id });
    }


    //4 4.1
    await this._checkIfAllMaterialsExists(
      dtoIn.materialIdList,
      awid,
      Errors.Update.materialDoesNotExist
    );
    

    // 5
    let dtoOut;
    let id = dtoIn.id;
    let updatedTopicObject = {...dtoIn};
    delete updatedTopicObject.id;
    try {
      dtoOut = await this.topicDao.update(awid, id, updatedTopicObject);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        //6.1
        throw new Errors.Update.DbDoesNotRespond();
      }
      throw e;
    }

    // 6
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async list(awid, dtoIn) {
      // 1, 1.1 1.1.1 1.1.2    

    // 2, 2.1
    let validationResult = this.validator.validate("topicListDtoInType", dtoIn);
    // 2.3
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.listUnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );
    
    // 2.4
    const dtoInWithDefaultValues = { ...dtoIn };
    if (!dtoIn.groupBySubject) {
      dtoInWithDefaultValues.groupBySubject = DEFAULT_VALUES.groupBySubject;
    }

    if (!dtoIn.order) {
      dtoInWithDefaultValues.order = DEFAULT_VALUES.order;
    }
   
    !dtoIn.pageInfo && (dtoInWithDefaultValues.pageInfo = {});
    
    !(dtoIn.pageInfo||{}).pageIndex && (dtoInWithDefaultValues.pageInfo.pageIndex = DEFAULT_VALUES.pageIndex);
    !(dtoIn.pageInfo||{}).pageSize && (dtoInWithDefaultValues.pageInfo.pageSize = DEFAULT_VALUES.pageSize);
    

    // 3
    let dtoOut = {};
    try{
      dtoOut = {topicList: (await this.topicDao.list(awid, dtoInWithDefaultValues)||{}).itemList};
    }catch(e){
      throw new Errors.List.topicDaoListFailed();
    }

    // 4
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async get(awid, dtoIn) {
    let validationResult = this.validator.validate("topicGetDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.Get.invalidDtoIn
    );
    let dtoOut;
    try {
      dtoOut = await this.topicDao.getById(awid, dtoIn.id);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Get.DbDoesNotRespond({ "cause":e});
      }
      throw e;
    }
    if (!dtoOut) {
      
      throw new Errors.Get.topicDoesNotExist({topicID: dtoIn.id});
    }
    // 4
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async delete(awid, dtoIn) {
    //1, 1.1

    // 2, 2.1
    let validationResult = this.validator.validate("topicDeleteDtoInType", dtoIn);
    // 2.2, 2.3
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.deleteUnsupportedKeys.code,
      Errors.Delete.invalidState
    );

    //3
    let topic
    try{
    topic = await this.topicDao.getById(awid, dtoIn.id);
    }catch(e){
      console.error(e);
      throw new Errors.Delete.DbDoesNotRespond({"cause": e});
    }
    if (!topic) {
      //3.1
      throw new Errors.Delete.topicDoesNotExist();
    }

    // 4
    let dtoOut = {};
    try {
      await this.topicDao.delete(awid, dtoIn.id);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        //4.1
        throw new Errors.Delete.DbDoesNotRespond({"cause": e});
      }
      throw e;
    }

    // 5
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }


  async _checkIfAllMaterialsExists(materialIdList, awid, errorClass) {
    const nonExistingMaterialIds = [];
    
    if(Array.isArray(materialIdList)){
    for (let materialId of materialIdList) {
      let material = await this.materialDao.getById(awid, materialId);
      if (!material) {
        nonExistingMaterialIds.push(materialId);
      }
    }
  }

    if (nonExistingMaterialIds.length) {
      throw new errorClass({ materialId: nonExistingMaterialIds });
    }
  }

  async create(awid, dtoIn) {
    //1, 1.1

    //2, 2.1
    let validationResult = this.validator.validate("topicCreateDtoInType", dtoIn);
    
    //2.2, 2.3
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.invalidDtoIn
    );

    //3
    await this._checkIfAllMaterialsExists(
      dtoIn.materialIdList,
      awid,
      Errors.Create.materialDoesNotExist
    );

    //4
    let dtoOut;
    try {
      dtoOut = await this.topicDao.create(
        {
          awid,
          ...dtoIn
        }
      );
    } catch (e) {
        //4.1
        throw new Errors.Create.topicDaoCreateFailed({"cause": e});
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

}

module.exports = new TopicAbl();
