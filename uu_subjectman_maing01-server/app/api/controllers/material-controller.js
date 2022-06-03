"use strict";
const MaterialAbl = require("../../abl/material-abl.js");

class MaterialController {

  list(ucEnv) {
    return MaterialAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  delete(ucEnv) {
    return MaterialAbl.delete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return MaterialAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new MaterialController();
