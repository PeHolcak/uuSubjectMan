"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/subject-error.js");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },
  getUnsupportedKeys: {
    code: `${Errors.Get.UC_CODE}unsupportedKeys`,
  },
  deleteUnsupportedKeys: {
    code: `${Errors.Delete.UC_CODE}unsupportedKeys`,
  },
  updateUnsupportedKeys: {
    code: `${Errors.Update.UC_CODE}unsupportedKeys`,
  },
  listUnsupportedKeys: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`,
  },
};

const DEFAULT_VALUES = {
  organization: "Unicorn College",
  order: "asc",
  groupByStudyProgramme: "false",
  pageIndex: 0,
  pageSize: 10,
};

class SubjectAbl {
  constructor() {
    this.validator = Validator.load();
    this.subjectDao = DaoFactory.getDao("subject");
    this.topicDao = DaoFactory.getDao("topic");
    this.materialDao = DaoFactory.getDao("material");
  }

  async list(awid, dtoIn) {
    //1, 1.1 1.1.1 1.1.2
    //2, 2.1
    let validationResult = this.validator.validate("subjectListDtoInType", dtoIn);
    //2.3
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.listUnsupportedKeys.code,
      Errors.List.invalidDtoIn
    );

    //2.4
    const dtoInWithDefaultValues = { ...dtoIn };
    console.log("groupByStudyProgramme2",dtoIn.groupByStudyProgramme)
    if (dtoIn.groupByStudyProgramme !== false && !dtoIn.groupByStudyProgramme) {
      dtoInWithDefaultValues.groupByStudyProgramme = DEFAULT_VALUES.groupByStudyProgramme;
    }

    if (dtoIn.order !== false && !dtoIn.order) {
      dtoInWithDefaultValues.order = DEFAULT_VALUES.order;
    }
   
    !dtoIn.pageInfo && (dtoInWithDefaultValues.pageInfo = {});
    
    !(dtoIn.pageInfo||{}).pageIndex && (dtoInWithDefaultValues.pageInfo.pageIndex = DEFAULT_VALUES.pageIndex);
    !(dtoIn.pageInfo||{}).pageSize && (dtoInWithDefaultValues.pageInfo.pageSize = DEFAULT_VALUES.pageSize);
    
    //3
    let dtoOut = {};
    try {
      dtoOut = { itemList: await this.subjectDao.list(awid, dtoInWithDefaultValues), pageInfo: dtoInWithDefaultValues.pageInfo};
    } catch (e) {
      throw new Errors.List.subjectDaoListFailed({cause: e});
    }

    //4
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async update(awid, dtoIn) {
    //1., 1.1.

    //2., 2.1.
    let validationResult = this.validator.validate("subjectUpdateDtoInType", dtoIn);
    //2.2., 2.3.
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.updateUnsupportedKeys.code,
      Errors.Update.invalidDtoIn
    );

    //2.4.
    let dtoInWithDefaultValues;
    dtoIn.organization
      ? (dtoInWithDefaultValues = { ...dtoIn })
      : (dtoInWithDefaultValues = { ...dtoIn, organization: DEFAULT_VALUES.organization });

    //3.
    let isExistingSubjectWithId;
    try {
      isExistingSubjectWithId = Boolean(await this.subjectDao.getById(awid, dtoIn.id));
    } catch (e) {
      //3.2.
      if (e instanceof ObjectStoreError) {
        throw new Errors.Update.subjectDaoGetFailed();
      }
      throw e;
    }

    //3.1.
    if (!isExistingSubjectWithId) {
      throw new Errors.Update.subjectDoesNotExist();
    }
    //4., 4.1.
    await this._checkIfAllTopicsExists(dtoInWithDefaultValues.topicIdList, awid, Errors.Update.topicDoesNotExist);

    //5., 5.1.
    await this._checkIfAllMaterialsExists(
      dtoInWithDefaultValues.materialIdList,
      awid,
      Errors.Update.materialDoesNotExist
    );

    //6.
    let dtoOut;
    let id = dtoIn.id;
    let updatedSubjectObject = { ...dtoIn };
    delete updatedSubjectObject.id;
    try {
      dtoOut = await this.subjectDao.update(awid, id, updatedSubjectObject);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        //6.1.
        throw new Errors.Update.subjectDaoUpdateFailed();
      }
      throw e;
    }

    //7.
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async _checkIfAllTopicsExists(topicsId, awid, errorClass) {
    const nonExistingTopicIds = [];
    
    if(Array.isArray(topicsId)){
    for (let topicId of topicsId) {
      let topic = await this.topicDao.getById(awid, topicId);
      if (!topic) {
        nonExistingTopicIds.push(topicId);
      }
    }
  }

    if (nonExistingTopicIds.length) {
      throw new errorClass({ topicId: nonExistingTopicIds });
    }
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
    //1., 1.1.

    //2., 2.1.
    let validationResult = this.validator.validate("subjectCreateDtoInType", dtoIn);

    //2.2., 2.3.
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.invalidDtoIn
    );

    //2.4.
    let dtoInWithDefaultValues;
    dtoIn.organization
      ? (dtoInWithDefaultValues = { ...dtoIn })
      : (dtoInWithDefaultValues = { ...dtoIn, organization: DEFAULT_VALUES.organization });

    //3.
    let isSubjectCodeExisting;
    try {
      isSubjectCodeExisting = await this.subjectDao.getByCode(awid, dtoInWithDefaultValues.code);
    } catch (err) {
      //3.1.
      throw new Errors.Create.subjectDaoGetFailed();
    }

    if (isSubjectCodeExisting) {
      //3.2.
      throw new Errors.Create.subjectDoesExist({ subjectId: dtoInWithDefaultValues.code });
    }

    //4., 4.1.
    await this._checkIfAllTopicsExists(dtoInWithDefaultValues.topicIdList, awid, Errors.Create.topicDoesNotExist);

    //5., 5.1.
    await this._checkIfAllMaterialsExists(
      dtoInWithDefaultValues.materialIdList,
      awid,
      Errors.Create.materialDoesNotExist
    );

    //6.
    let dtoOut;
    try {
      dtoOut = await this.subjectDao.create({
        awid,
        ...dtoInWithDefaultValues,
      });
    } catch (e) {
      //6.1.
      throw new Errors.Create.subjectDaoCreateFailed();
    }

    //7.
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async get(awid, dtoIn) {
    // 1., 1.1.

    // 2., 2.1.
    let validationResult = this.validator.validate("subjectGetDtoInType", dtoIn);
    // 2.2., 2.3.
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.Get.invalidDtoIn
    );

    //3.
    let dtoOut;
    try {
      dtoOut = await this.subjectDao.getById(awid, dtoIn.id);
    } catch (e) {
      //3.1.
      if (e instanceof ObjectStoreError) {
        throw new Errors.Get.subjectDaoGetFailed();
      }
      throw e;
    }

    //3.2.
    if (!dtoOut) {
      throw new Errors.Get.subjectDoesNotExist();
    }
    // 4.
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return [dtoOut];
  }

  async delete(awid, dtoIn) {
    // 1., 1.1.

    // 2., 2.1.
    let validationResult = this.validator.validate("subjectDeleteDtoInType", dtoIn);
    // 2.2., 2.3.
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.deleteUnsupportedKeys.code,
      Errors.Delete.invalidDtoIn
    );

    // 3.
    let subject = await this.subjectDao.getById(awid, dtoIn.id);
    if (!subject) {
      //HDS 3.1.
      throw new Errors.Delete.subjectDoesNotExist({ subjectId: dtoIn.id });
    }

    // 4.
    let dtoOut = {};
    try {
      await this.subjectDao.delete(awid, dtoIn.id);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        // 4.1.
        throw new Errors.Delete.subjectDaoDeleteFailed();
      }
      throw e;
    }

    // 5.
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }
}

module.exports = new SubjectAbl();
