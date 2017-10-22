import resolve from 'rollup-plugin-node-resolve';

// Add here external dependencies that actually you use.
const globals = {
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    'rxjs/Observable': 'Rx',
    'rxjs/Observer': 'Rx',
    'rxjs/ReplaySubject': 'Rx',
    'rxjs/add/operator/map': 'Rx',
    'rxjs/add/operator/publishReplay': 'Rx'
};

export default {
    entry: './dist/modules/iotile.es5.js',
    dest: './dist/bundles/iotile.umd.js',
    format: 'umd',
    exports: 'named',
    moduleName: 'ng.iotile',
    plugins: [resolve()],
    external: Object.keys(globals),
    globals: globals,
    onwarn: () => { return }
}
