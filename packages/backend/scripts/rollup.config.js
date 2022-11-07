// #region imports
    // #region libraries
    import ttypescript from 'ttypescript';
    import commonjs from '@rollup/plugin-commonjs';
    import typescript from 'rollup-plugin-typescript2';
    import { nodeResolve } from '@rollup/plugin-node-resolve';
    import { terser } from 'rollup-plugin-terser';
    // #endregion libraries


    // #region external
    import pkg from '../package.json';
    // #endregion external
// #endregion imports



// #region module
const build = {
    input: 'source/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            exports: 'named',
            inlineDynamicImports: true,
        },
    ],
    external: [
        'body-parser',
        'cors',
        'express',
        'modbus-serial',
    ],
    plugins: [
        commonjs(),
        nodeResolve({
            preferBuiltins: true,
        }),
        typescript({
            typescript: ttypescript,
        }),
        terser({
            mangle: false,
            compress: false,
            format: {
                beautify: true,
                comments: false,
            },
        }),
    ],
};
// #endregion module



// #region exports
export default build;
// #endregion exports
