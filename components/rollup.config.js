import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

import pkg from './package.json';

export default {
    input: 'src/index.tsx',
    output: 
    {
      dir: 'dist',
      format: 'cjs'
    },
    plugins: [resolve({
      // pass custom options to the resolve plugin
      customResolveOptions: {
        moduleDirectory: 'node_modules'
      }
    }),
    typescript(),
    commonjs({
        namedExports: {
          react: ['cloneElement', 'createContext', 'Component', 'createElement'],
          'react-dom': ['render', 'hydrate']
        }
      })],
  
    // indicate which modules should be treated as external
    external: ['react', 'react-dom']
  };