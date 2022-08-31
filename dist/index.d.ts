import { Plugin } from 'vite';

interface ViteGitRevisionPlugin {
    gitWorkTree?: any;
    lightweightTags?: boolean;
    branch?: boolean;
    commithashCommand?: string;
    versionCommand?: string;
    branchCommand?: string;
}
declare const _default: (options: ViteGitRevisionPlugin) => Plugin;

export { ViteGitRevisionPlugin, _default as default };
