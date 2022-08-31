import { Plugin } from 'vite'
import { runGitCommand } from './helpers/run-git-command'

const COMMITHASH_COMMAND = 'rev-parse HEAD'
const VERSION_COMMAND = 'describe --always'
const BRANCH_COMMAND = 'rev-parse --abbrev-ref HEAD'

const defaultOpt = {
    lightweightTags:false,
    branch:false,
    commithashCommand:COMMITHASH_COMMAND,
    versionCommand:VERSION_COMMAND,
    branchCommand:BRANCH_COMMAND,
}

export interface ViteGitRevisionPlugin {
    // git work tree
    gitWorkTree?: any;
    // lightweight tags support.
    lightweightTags?: boolean;
    // branch name support
    branch?: boolean;
    //change the default git command used to read the value of COMMITHASH
    commithashCommand?: string;
    //change the default git command used to read the value of VERSION
    versionCommand?: string;
    //change the default git command used to read the value of BRANCH
    branchCommand?: string;
}


export default (options: ViteGitRevisionPlugin): Plugin => {
    options = Object.assign(defaultOpt,options?options:{})
    if (options.versionCommand && options.lightweightTags) {
        throw new Error('lightweightTags can\'t be used together versionCommand')
    }
  
    return {
      name: 'vite:git-revision',
      config(config:any) {
          config.define.VERSION = JSON.stringify(runGitCommand(options.gitWorkTree,options.versionCommand))
          config.define.BRANCH = JSON.stringify(runGitCommand(options.gitWorkTree,options.branchCommand))
      }
    };
  };
