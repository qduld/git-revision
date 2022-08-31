var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});

// src/helpers/run-git-command.ts
import path from "path";

// src/helpers/remove-empty-lines.ts
function removeEmptyLines(string) {
  return string.replace(/[\s\r\n]+$/, "");
}

// src/helpers/run-git-command.ts
var exec = __require("child_process").exec;
var execSync = __require("child_process").execSync;
function runGitCommand(gitWorkTree, command, callback) {
  var gitCommand = gitWorkTree ? [
    "git",
    "--git-dir=" + path.join(gitWorkTree, ".git"),
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
export {
  src_default as default
};
