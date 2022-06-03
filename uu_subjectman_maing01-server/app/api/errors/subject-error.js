"use strict";

const SubjectmanMainUseCaseError = require("./subjectman-main-use-case-error.js");
const SUBJECT_ERROR_PREFIX = `${SubjectmanMainUseCaseError.ERROR_PREFIX}subject/`;

const Create = {
  UC_CODE: `${SUBJECT_ERROR_PREFIX}create/`,

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
  subjectDoesExist: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}subjectDoesExist`;
      this.message = "	Subject does exist.";
    }
  },
  subjectDaoGetFailed: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}subjectDaoGetFailed`;
      this.message = "Get subject by subject DAO create failed.";
    }
  },
  topicDoesNotExist: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}topicDoesNotExist`;
      this.message = "Topic does not exist.";
    }
  },
  materialDoesNotExist: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}materialDoesNotExist`;
      this.message = "Material does not exist.";
    }
  },
  subjectDaoCreateFailed: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}subjectDoesExist`;
      this.message = "	Create subject by subject DAO create failed.";
    }
  },
};

const Get = {
  UC_CODE: `${SUBJECT_ERROR_PREFIX}get/`,
  invalidDtoIn: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  invalidState: class extends SubjectmanMainUseCaseError {
    constructor() {
    super(...arguments);
    this.code = `${Get.UC_CODE}invalidState`;
    this.message = "Location state is not valid.";
}
},
subjectDaoGetFailed: class extends SubjectmanMainUseCaseError {
constructor() {
  super(...arguments);
  this.code = `${Get.UC_CODE}subjectDaoGetFailed`;
  this.message = "Get subject by subject DAO get failed.";
}
},

subjectDoesNotExist: class extends SubjectmanMainUseCaseError {
constructor() {
  super(...arguments);
  this.code = `${Get.UC_CODE}subjectDoesNotExist`;
  this.message = "Subject does not exist.";
}
},
};

const Delete = {
  UC_CODE: `${SUBJECT_ERROR_PREFIX}delete/`,
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

  subjectDoesNotExist: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}subjectDoesNotExist`;
      this.message = "Subject does not exist.";
    }
  },

  subjectDaoDeleteFailed: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}subjectDaoDeleteFailed`;
      this.message = "Delete subject by subject DAO delete failed.";
    }
  },
};

const Update = {
  UC_CODE: `${SUBJECT_ERROR_PREFIX}update/`,
  invalidDtoIn: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
    }
  },

  invalidState: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidState`;
      this.message = "Location state is not valid.";
    }
  },

  subjectDoesNotExist: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}subjectDoesExist`;
      this.message = "Subject does not exist.";
    }
  },

  topicDoesNotExist: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}topicDoesNotExist`;
      this.message = "One or more topics does not exist.";
    }
  },

  materialDoesNotExist: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}materialDoesNotExist`;
      this.message = "Material does not exist.";
    }
  },

  subjectDaoUpdateFailed: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}subjectDaoUpdateFailed`;
      this.message = "Update subject by subject DAO update failed.";
    }
  }, 
  subjectDaoGetFailed: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}subjectDaoGetFailed`;
      this.message = "Get subject by subject DAO failed.";
    }
  }
};

const List = {
  UC_CODE: `${SUBJECT_ERROR_PREFIX}list/`,
  invalidDtoIn: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
    }
  },

  invalidState: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidState`;
      this.message = "Location state is not valid.";
    }
  },
  subjectDaoListFailed: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}subjectDaoListFailed`;
      this.message = "List subjects by subject DAO list failed.";
    }
  },
};

module.exports = {
  List,
  Update,
  Get,
  Create,
  Delete
};
