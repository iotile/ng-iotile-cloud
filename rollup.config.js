export default {
	entry: 'dist/ng-iotile-cloud.js',
	dest: 'dist/bundles/ng-iotile-cloud.umd.js',
	sourceMap: false,
	format: 'umd',
	moduleName: 'ng-iotile-cloud',
	globals: {
        '@angular/core': 'ng.core',
        '@angular/http': 'ng.http',
		'@angular/common': 'ng.common',
		'rxjs/Observable': 'Rx',
		'rxjs/ReplaySubject': 'Rx',
		'rxjs/add/operator/map': 'Rx.Observable.prototype',
		'rxjs/add/operator/mergeMap': 'Rx.Observable.prototype',
		'rxjs/add/observable/fromEvent': 'Rx.Observable',
		'rxjs/add/observable/of': 'Rx.Observable'
	}
}