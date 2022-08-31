"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);

// src/helpers/run-git-command.ts
var import_path = __toESM(require("path"));

// src/helpers/remove-empty-lines.ts
function removeEmptyLines(string) {
  return string.replace(/[\s\r\n]+$/, "");
}

// src/helpers/run-git-command.ts
var exec = require("child_process").exec;
var execSync = require("child_process").execSync;
function runGitCommand(gitWorkTree, command, callback) {
  var gitCommand = gitWorkTree ? [
    "git",
    "--git-dir=" + import_path.default.join(gitWorkTree, ".git"),
    "--work-tree=" + gitWorkTree,
    command
  ].join(" ") : [
    "git",
    command
  ].join(" ");
  if (callback) {
    exec(gitCommand, function(err, stdout) {
      if (err) {
        return callback(err);
      }
      callback(null, removeEmptyLines(stdout));
    });
  } else {
    return removeEmptyLines("" + execSync(gitCommand));
  }
}

// src/index.ts
var COMMITHASH_COMMAND = "rev-parse HEAD";
var VERSION_COMMAND = "describe --always";
var BRANCH_COMMAND = "rev-parse --abbrev-ref HEAD";
var defaultOpt = {
  lightweightTags: false,
  branch: false,
  commithashCommand: COMMITHASH_COMMAND,
  versionCommand: VERSION_COMMAND,
  branchCommand: BRANCH_COMMAND
};
var src_default = (options) => {
  options = Object.assign(defaultOpt, options ? options : {});
  if (options.versionCommand && options.lightweightTags) {
    throw new Error("lightweightTags can't be used together versionCommand");
  }
  return {
    name: "vite:git-revision",
    config(config) {
      config.define.GITVERSION = JSON.stringify(runGitCommand(options.gitWorkTree, options.versionCommand));
      config.define.GITBRANCH = JSON.stringify(runGitCommand(options.gitWorkTree, options.branchCommand));
    }
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
