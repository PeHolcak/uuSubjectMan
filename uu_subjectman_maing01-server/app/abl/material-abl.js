"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/material-error.js");

const WARNINGS = {
  deleteUnsupportedKeys: {
    code: `${Errors.Delete.UC_CODE}unsupportedKeys`,
  },
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },
  listUnsupportedKeys: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`,
  },
};

class MaterialAbl {
  constructor() {
    this.validator = Validator.load();
    this.materialDao = DaoFactory.getDao("material");
    this.topicDao = DaoFactory.getDao("topic");
    this.subjectDao = DaoFactory.getDao("subject");
  }

  async list(awid, dtoIn) {
    // HDS 1, 1.1 1.1.1 1.1.2

    // HDS 2, 2.1
    let validationResult = this.validator.validate("materialListDtoInType", dtoIn);
    // HDS 2.3
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.listUnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );

    !dtoIn.pageInfo && (dtoIn.pageInfo = {});
    !dtoIn.pageInfo.pageIndex && (dtoIn.pageInfo.pageIndex = 0);
    !dtoIn.pageInfo.pageSize && (dtoIn.pageInfo.pageSize = 10);

    // HDS 3
    let dtoOut = {};
    try {
      dtoOut = await this.materialDao.list(awid, dtoIn.pageInfo, "asc");
    } catch (e) {
      console.error("dtoOut", e);
      throw new Errors.List.materialDaoListFailed({ "cause": e });
    }

    // HDS 4
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async delete(awid, dtoIn) {
    // HDS 1, 1.1

    // HDS 2, 2.1
    let validationResult = this.validator.validate("materialDeleteDtoInType", dtoIn);
    // HDS 2.2, 2.3
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.deleteUnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    //HDS 3
    let material;
    try {
      material = await this.materialDao.getById(awid, dtoIn.id);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        //HDS 3.1
        throw new Errors.Delete.materialDaoGetFailed({ e });
      }
      throw e;
    }

    if (!material) {
      //HDS 3.2
      throw new Errors.Delete.materialDoesNotExist({ materialId: dtoIn.id });
    }

    // HDS 4
    let dtoOut = {};
    try {
      await this.materialDao.delete(awid, dtoIn.id);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        //HDS 4.1
        throw new Errors.Delete.materialDaoDeleteFailed({ e });
      }
      throw e;
    }

    // HDS 5
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async create(awid, dtoIn) {
    // HDS 1, 1.1

    // HDS 2, 2.1
    let validationResult = this.validator.validate("materialCreateDtoInType", dtoIn);

    // HDS 2.2, 2.3
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.invalidDtoIn
    );

     //5
     let isMaterialCodeExisting;
     try {
      isMaterialCodeExisting = await this.materialDao.getByCode(awid, dtoIn.code);
     } catch (err) {
       throw new Errors.Create.materialDaoGetFailed();
     };
 
     if (isMaterialCodeExisting) {
       //5.1
       throw new Errors.Create.materialCodeDoesExist();
     }

    //HDS 6
    let dtoOut;
    try {
      dtoOut = await this.materialDao.create(
        {
          awid,
          ...dtoIn
        }
      );
    } catch (e) {
      throw new Errors.Create.materialDaoCreateFailed();
    }

    //HDS 7
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }
}

module.exports = new MaterialAbl();
