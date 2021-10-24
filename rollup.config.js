import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default [
	{
		input: 'src/main.js',
		output: {
			name: 'compare',
			file: 'dist/index.js',
			format: 'es'
		},
		plugins: [
			resolve(), // so Rollup can find external libs
			commonjs() // so Rollup can convert external libs to an ES module
		]
	}
];