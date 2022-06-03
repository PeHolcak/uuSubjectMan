"use strict";

const SubjectmanMainUseCaseError = require("./subjectman-main-use-case-error.js");
const TOPIC_ERROR_PREFIX = `${SubjectmanMainUseCaseError.ERROR_PREFIX}topic/`;

const Create = {
  UC_CODE: `${TOPIC_ERROR_PREFIX}create/`,
  invalidDtoIn: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
    }
  },

  invalidState: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidState`;
      this.message = "Location state is not valid.";
    }
  },
  materialDoesNotExist: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}materialDoesNotExist`;
      this.message = "List subjects by subject DAO list failed.";
    }
  },

  topicDaoCreateFailed: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}DbDoesNotRespond`;
      this.message = "Database doesn't respond.";
    }
  },
};

const Delete = {
  UC_CODE: `${TOPIC_ERROR_PREFIX}delete/`,
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

  topicDoesNotExist: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}topicDoesNotExist`;
      this.message = "Topic does not exist.";
    }
  },

  DbDoesNotRespond: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}DbDoesNotRespond`;
      this.message = "Database doesn't respond.";
    }
  },
  
};

const Get = {
  UC_CODE: `${TOPIC_ERROR_PREFIX}get/`,
  invalidDtoIn: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
    }
  },

  invalidState: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidState`;
      this.message = "Location state is not valid.";
    }
  },

  topicDoesNotExist: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}topicDoesNotExist`;
      this.message = "Get topic by id failed.";
    }
  },
  DbDoesNotRespond: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}DbDoesNotRespond`;
      this.message = "Database doesn't respond.";
    }
  }

};

const List = {
  UC_CODE: `${TOPIC_ERROR_PREFIX}list/`,
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
  topicDaoListFailed: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}topicDaoListFailed`;
      this.message = "List topic by subject DAO list failed.";
    }
  }
};

const Update = {
  UC_CODE: `${TOPIC_ERROR_PREFIX}update/`,
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
  materialDoesNotExist: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}materialDoesNotExist`;
      this.message = "Material does not exist.";
    }
  },
  topicDoesNotExist: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}topicDoesNotExist`;
      this.message = "Topic does not exist.";
    }
  },
  DbDoesNotRespond: class extends SubjectmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}DbDoesNotRespond`;
      this.message = "Database doesn't respond.";
    }
  }
};

module.exports = {
  Update,
  List,
  Get,
  Delete,
  Create
};
