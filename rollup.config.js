import resolve from 'rollup-plugin-node-resolve';

// Add here external dependencies that actually you use.
const globals = {
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    'rxjs/Rx': 'Rx',
    'rxjs/Observable': 'Rx',
    'rxjs/Observer': 'Rx',
    'rxjs/ReplaySubject': 'Rx',
    'rxjs/BehaviorSubject': 'Rx',
    'rxjs/add/operator/map': 'Rx.Observable.prototype',
    'rxjs/add/operator/catch': 'Rx.Observable.prototype',
    'rxjs/add/operator/publishReplay': 'Rx.Observable.prototype',
    'rxjs/add/operator/of': 'Rx.Observable.prototype',
    'rxjs/add/operator/forkJoin': 'Rx.Observable.prototype',
    'rxjs/add/operator/flatmap': 'Rx.Observable.prototype',
    'rxjs/add/observable/first': 'Rx.Observable.prototype',
    'rxjs/add/observable/throw': 'Rx.Observable.prototype'
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
