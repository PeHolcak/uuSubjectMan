"use strict";

const SubjectmanMainUseCaseError = require("./subjectman-main-use-case-error.js");
const MATERIAL_ERROR_PREFIX = `${SubjectmanMainUseCaseError.ERROR_PREFIX}material/`;

const Delete = {
  UC_CODE: `${MATERIAL_ERROR_PREFIX}delete/`,

  invalidDtoIn: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
    }
  },

  invalidState: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidState`;
      this.message = "Location state is not valid.";
    }
  },

  materialDoesNotExist: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}materialDoesNotExist`;
      this.message = "Material does not exist.";
    }
  },

  materialDaoGetFailed: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}materialDaoGetFailed`;
      this.message = "Database error.	";
    }
  },

  materialDaoDeleteFailed: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}materialDaoDeleteFailed`;
      this.message = "Database error.	";
    }
  },
};

const Create = {
  UC_CODE: `${MATERIAL_ERROR_PREFIX}create/`,

  invalidDtoIn: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  invalidState: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidState`;
      this.message = "Location state is not valid.";
    }
  },
  materialIdDoesExist: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}materialDoesIdExist`;
      this.message = "Material ID does exist.";
    }
  },
  materialDaoGetFailed: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}materialDaoGetFailed`;
      this.message = "Database error.	";
    }
  },
  materialDaoCreateFailed: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}materialDaoCreateFailed`;
      this.message = "Create material by material DAO create failed.";
    }
  },
  topicDoesNotExist: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}topicDoesNotExist`;
      this.message = "Topic does not exist.";
    }
  },
  topicDaoGetFailed: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}topicDoesNotExist`;
      this.message = "Cannot get topic.";
    }
  },
  materialCodeDoesExist: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}materialCodeDoesExist`;
      this.message = "Material code does exist.";
    }
  },
  subjectDoesNotExist: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}subjectDoesNotExist`;
      this.message = "Subject does not exist.";
    }
  },
};

const List = {
  UC_CODE: `${MATERIAL_ERROR_PREFIX}list/`,

  invalidDtoIn: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  materialDaoListFailed: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}materialDaoCreateFailed`;
      this.message = "List materials by material DAO list failed.";
    }
  }
};

module.exports = {
  List,
  Delete,
  Create

};
