import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import { Observable, ReplaySubject } from 'rxjs/Rx';

import {
  Credentials,
  User,
  Org,
  Project,
  Device,
  Variable,
  VarType,
  Stream,
  Stats,
  DataPoint,
  DataPage,
  EventPoint,
  EventPage,
  SensorGraph,
  DataFilterArgs,
  Property
} from './models';

/*
  Generated class for the CloudService provider.

  Main Service for getting and posting data from/to https://iotile.cloud
*/
@Injectable()
export class CloudService {
  private _http: Http;
  private _apiEndpoint: string;
  private _token: string;

  constructor(
    http: Http,
  ) {
    console.log('Hello CloudService Provider');
    this._http = http;
  }

  private _createAuthorizationHeader(headers: Headers): void {
    headers.append('Content-Type', 'application/json');
    if (this._token) {
      headers.append('Authorization', 'JWT ' + this._token);
    }
  }

  private _getRequestOptions(): RequestOptions {
    let headers: Headers = new Headers();
    this._createAuthorizationHeader(headers);
    return new RequestOptions({ headers: headers });
  }

  public _get(url: string): Observable<any> {
    let options: RequestOptions = this._getRequestOptions();

    return this._http.get(this._apiEndpoint + url, options)
      .map((responseData) => {
        return responseData.json();
      });
  }

  private _patch(url: string, payload: any): Observable<any>  {
    let options: RequestOptions = this._getRequestOptions();
    // console.log(url);
    return this._http.patch(this._apiEndpoint + url, payload, options)
      .map((responseData) => {
        console.log('_patch() responseData', url, responseData);
        return responseData.json();
      });
  }

  private _post(url: string, payload: any): Observable<any>  {
    let options: RequestOptions = this._getRequestOptions();
    // console.log(url);
    return this._http.post(this._apiEndpoint + url, payload, options)
      .map((responseData) => {
        console.log('_post() responseData', url, responseData);
        return responseData.json();
      });
  }

  public setApiEndPoint (url: string): void {
    this._apiEndpoint = url;
  }

  public setToken (token: string): void {
    console.log('[CloudService] Setting token');
    this._token = token;
  }

  public clearToken (): void {
    this._token = null;
  }

  public authenticate(credentials: Credentials): Observable<any> {

    console.log('[CloudService] 1.- credentials.username=' + credentials.username);
    let headers: Headers = new Headers();
    this._createAuthorizationHeader(headers);
    let options: RequestOptions = new RequestOptions({ headers: headers });
    let payload: {} = credentials.getPayload();

    return this._http.post(this._apiEndpoint + '/auth/api-jwt-auth/', payload, options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let data: any = response.json();
        if (data && data.token) {
            // console.log('[CloudService] 2.- Got jwt data: ', data);
            this._token = data.token;
            return this._token;
        }
      });
  }

  public getUserInfo(): Observable<any> {

    return this._get('/account/')
      .publishReplay(1).refCount()
      .map((results: Array<any>) => {
        let user: User;
        if (results) {
          let rawData: {} = results['results'][0];
          // console.log(rawData);
          user = new User(rawData);
        }
        return user;
      });
  }

  public getSensorGraphs(): Observable<any> {
    // return an observable
    return this._get('/sg/')
      .publishReplay(1).refCount()
      .map((sgs: Array<any>) => {
        let result: Array<SensorGraph> = [];
        if (sgs) {
          sgs['results'].forEach((item) => {
            result.push(
              new SensorGraph(item));
          });
        }
      });
  }

  public getSensorGraph(slug: string): Observable<SensorGraph> {
    // return an observable
    return this._get('/sg/' + slug + '/')
      .map((data: any) => {
        return new SensorGraph(data);
      });
  }

  public getOrgs(): Observable<any> {
    // return an observable
    return this._get('/org/')
      .publishReplay(1).refCount()
      .map((orgs: Array<any>) => {
        let result: Array<Org> = [];
        if (orgs) {
          orgs['results'].forEach((item) => {
            result.push(
              new Org(item));
          });
        }
        return result.sort((a: any, b: any) => {
          if (a.name < b.name) {
            return -1;
          } else if (a.name > b.name) {
            return 1;
          } else {
            return 0;
          }
        });
      });
  }

  public postOrg(org: Org): Observable<Org>  {
    // return an observable
    let payload: any = org.getPatchPayload();
    return this._post('/org/', payload)
      .map((data: any) => {
        return new Org(data);
      });
  }

  public getProjects(): Observable<any>  {

    // return an observable
    return this._get('/project/')
      .publishReplay(1).refCount()
      .map((projects: Array<any>) => {
        let result: Array<Project> = [];
        if (projects) {
          projects['results'].forEach((item) => {
            result.push(
              new Project(item));
          });
        }
        return result.sort((a: Project, b: Project) => {
          if (a.orgSlug < b.orgSlug) {
            return -1;
          } else if (a.orgSlug > b.orgSlug) {
            return 1;
          } else {
            return 0;
          }
        });
      });
  }

  public patchProject(project: Project): Observable<Project>  {

    // return an observable
    let projectId: string = project.id;
    let url: string = '/project/' + projectId + '/';
    let payload: any = {
      name: project.name
    };
    // console.log(url);
    return this._patch(url, payload)
      .map((data: any) => {
        console.log('patchProject() data', data);
        return new Project(data);
      });
  }

  public getDevice(deviceSlug: string): Observable<Device>  {

    // return an observable
    let url: string = '/device/' + deviceSlug + '/';
    // console.log(url);
    return this._get(url)
      .map((data: any) => {
        return new Device(data);
      });
  }

  public patchDevice(device: Device): Observable<Device>  {

    // return an observable
    let deviceSlug: string = device.slug;
    let url: string = '/device/' + deviceSlug + '/';
    let payload: any = {
      label: device.label
    };
    // console.log(url);
    return this._patch(url, payload)
      .map((data: any) => {
        console.log('patchDevice() data', data);
        return new Device(data);
      });
  }

  public getVariable(varSlug: string): Observable<Variable>  {

    // return an observable
    let url: string = '/variable/' + varSlug + '/';
    // console.log(url);
    return this._get(url)
      .map((data: any) => {
        return new Variable(data);
      });
  }

  public getVariableType(varSlug: string): Observable<VarType>  {

    // return an observable
    let url: string = '/variable/' + varSlug + '/type/';
    // console.log(url);
    return this._get(url)
      .map((data: any) => {
        return new VarType(data);
      });
  }

  public getAllVarTypes(): Observable<any>  {

    // return an observable
    let url: string = '/vartype/';
    // console.log(url);
    return this._get(url)
      .map((data: Array<any>) => {
        let result: Array<VarType> = [];
        if (data) {
          // console.log(data);
          data['results'].forEach((item) => {
            result.push(
              new VarType(item));
          });
        }
        return result;
      });
  }

  public getVariables(project: Project): Observable<any>  {

    // return an observable
    let url: string = '/variable/?project=' + project.id;
    // console.log(url);
    return this._get(url)
      .map((data: Array<any>) => {
        let result: Array<Variable> = [];
        if (data) {
          // console.log(data);
          data['results'].forEach((item) => {
            result.push(
              new Variable(item));
          });
        }
        project.addVariables(result);
        return result;
      });
  }

  public patchVariable(variable: Variable): Observable<Variable>  {

    // return an observable
    let variableSlug: string = variable.slug;
    let url: string = '/variable/' + variableSlug + '/';
    let payload: any = variable.getPatchPayload();
    // console.log(url);
    return this._patch(url, payload)
      .map((data: any) => {
        return new Variable(data);
      });
  }

  public getDevices(project: Project): Observable<any>  {

    // return an observable
    let url: string = '/device/?project=' + project.id;
    // console.log(url);
    return this._get(url)
      .map((data: Array<any>) => {
        let result: Array<Device> = [];
        if (data) {
          data['results'].forEach((item) => {
            result.push(
              new Device(item));
          });
        }
        let sortedResults: Array<Device> = result.sort((a: Device, b: Device) => {
          let nameA: string = a.label.toUpperCase() || a.slug;
          let nameB: string = b.label.toUpperCase() || b.slug;
          if (nameA < nameB) {
            return -1;
          } else if (nameA > nameB) {
            return 1;
          } else {
            return 0;
          }
        });
        project.addDevices(sortedResults);
        return sortedResults;
      });
  }

  public getStreamsForDevice(deviceSlug: string, projectId: string): Observable<any>  {

    // return an observable
    let url: string = '/stream/?device__slug=' + deviceSlug + '&project=' + projectId;
    return this._get(url)
      .map((data: Array<any>) => {
        let result: Array<Stream> = [];
        if (data) {
          data['results'].forEach((item) => {
            result.push(
              new Stream(item));
          });
        }
        return result;
      });
  }

  public getStream(streamSlug: string): Observable<Stream>  {

    // return an observable
    let url: string = '/stream/' + streamSlug + '/';
    return this._get(url)
      .map((data: any) => {
        return new Stream(data);
      });
  }

  public patchStream(stream: Stream): Observable<Stream>  {

    // return an observable
    let streamSlug: string = stream.slug;
    let url: string = '/stream/' + streamSlug + '/';
    let payload: any = stream.getPatchPayload();
    // console.log(url);
    return this._patch(url, payload)
      .map((data: any) => {
        return new Stream(data);
      });
  }

  public getStreamStats(streamSlug: string, args: DataFilterArgs): Observable<any>  {

    // return an observable
    let url: string = '/stream/' + streamSlug + '/stats/';
    url += args.buildFilterString();

    // console.log(url);
    return this._get(url)
      .map((data: any) => {
        return new Stats(data);
      });
  }

  public getPointCount(url): Observable<number>  {

    url += '&page_size=5';
    console.debug('[CloudService] GET: ' + url);
    return this._get(url)
      .map((data: any) => {
        let result: number = 0;
        if (data) {
          result = data['count'];
        }
        return result;
      });
  }

  public getData(args: DataFilterArgs): Observable<Array<DataPoint>> {

    let url: string = '/data/';
    url += args.buildFilterString();
    console.debug('[CloudService] getData ====> ' + url);
    return this._get(url)
      .map((data: Array<any>) => {
        let result: Array<DataPoint> = [];
        if (data) {
          data['results'].forEach((item) => {
            result.push(new DataPoint(item));
          });
        }
        return result;
      });
  }

  public getSingleDataPage(dataPage: DataPage): Observable<DataPage>  {

    let url = dataPage.pageUrl();
    console.debug('[CloudService] GET: ', url);
    return this._get(url)
      .map((data: any) => {
        if (data) {
          data['results'].forEach((item) => {
            dataPage.data.push(new DataPoint(item));
          });
        }
        return dataPage;
      });
  }

  public getSingleEventPage(dataPage: EventPage): Observable<EventPage>  {

    let url = dataPage.pageUrl();
    console.debug('[CloudService] GET: ', url);
    return this._get(url)
      .map((data: any) => {
        if (data) {
          data['results'].forEach((item) => {
            dataPage.data.push(new EventPoint(item));
          });
        }
        return dataPage;
      });
  }

  public getAllStreamData(stream: Stream, args: DataFilterArgs): ReplaySubject<any>  {

    // Uses getPointCount to get 10 entries, just to get a total count.
    // It then uses that total count to calculate the number of total pages
    // needed to fetch ALL entries, and generates a forkJoin with all GETs (getData)
    // This ensures the function won't return results until all GETs return
    // Each getData call returns a dataPage with the results for that page fetch
    let returnedData = new ReplaySubject(1);

    let urlBase: string = '/stream/' + stream.slug + '/data/';
    let url: string = urlBase + args.buildFilterString();
    console.debug('[CloudService] getAllData ====> ' + url);
    this.getPointCount(url).subscribe(
      count => {

        // Reset pageSize to the default size to get proper sized data pages
        args.pageSize = 1000;
        let dataUrl = urlBase + args.buildFilterString();
        let pageCount = Math.ceil(count / args.pageSize);
        console.debug('No. of pages (to be forkJoin-ed): ' + count + '/' + args.pageSize + '=' + pageCount);
        if (pageCount < 1) {
          returnedData.next(pageCount);
        }

        let observables = [];

        let dataPages: Array<DataPage> = [];
        for (let i = 1; i <= pageCount; i++) {
          dataPages[i] = new DataPage(dataUrl, i, pageCount, stream);
          observables.push(this.getSingleDataPage(dataPages[i]));
        }
        let firstObservable = Observable.forkJoin(observables);
        firstObservable.subscribe(
          allData => {
            let totalCount = 0;
            for (let key in allData) {
              let dataPage = allData[key] as DataPage;

              dataPage.data.forEach(item => {
                dataPage.stream.data.push(item);
                totalCount++;
              });
              console.log('Page ' + dataPage.page + ' for ' + dataPage.stream.slug + ': ' + totalCount);
            }
            returnedData.next(totalCount);
          });
      },
      err => {
        console.error(err);
        returnedData.error(err);
      }
    );
    return returnedData;
  }

  public getAllEvents(args: DataFilterArgs, eventArray: Array<EventPoint>): ReplaySubject<any>  {

    // Uses getPointCount to get 10 entries, just to get a total count.
    // It then uses that total count to calculate the number of total pages
    // needed to fetch ALL entries, and generates a forkJoin with all GETs (getData)
    // This ensures the function won't return results until all GETs return
    // Each getData call returns a dataPage with the results for that page fetch
    let returnedData = new ReplaySubject(1);

    let urlBase: string = '/event/';
    let url: string = urlBase + args.buildFilterString();
    console.debug('[CloudService] getAllData ====> ' + url);
    this.getPointCount(url).subscribe(
      count => {

        // Reset pageSize to the default size to get proper sized data pages
        args.pageSize = 1000;
        let dataUrl = urlBase + args.buildFilterString();
        let pageCount = Math.ceil(count / args.pageSize);
        console.debug('No. of pages (to be forkJoin-ed): ' + args.pageSize + '/' + count + '=' + pageCount);
        let observables = [];

        let dataPages: Array<EventPage> = [];
        for (let i = 1; i <= pageCount; i++) {
          dataPages[i] = new EventPage(dataUrl, i, pageCount);
          observables.push(this.getSingleEventPage(dataPages[i]));
        }
        let firstObservable = Observable.forkJoin(observables);
        firstObservable.subscribe(
          allData => {
            let totalCount = 0;
            for (let key in allData) {
              let dataPage = allData[key] as EventPage;

              dataPage.data.forEach(item => {
                eventArray.push(item);
                totalCount++;
              });
              console.log('Event Page ' + dataPage.page + ': ' + totalCount);
            }
            returnedData.next(totalCount);
          });
      },
      err => {
        console.error(err);
        returnedData.error(err);
      }
    );
    return returnedData;
  }

  public getEventDataContent(id: number): Observable<any>  {

    let url: string = '/event/' + id + '/data/';
    console.debug('[CloudService] getEventData ====> ' + url);
    return this._get(url);
  }

  public uploadStreamData(payload: {}): Observable<any> {
    console.log('[CloudService] uploadStreamData()');
    let options: RequestOptions = this._getRequestOptions();
    return this._http.post(this._apiEndpoint + '/data/', payload, options)
      .map(res => res.json());
  }

  public getDeviceProperties(device: Device): Observable<Device> {
    let url = '/device/' + device.slug + '/properties/';
    return this._get(url)
               .map((results: Array<Property>) => {
                 let properties: Array<Property> = results.map(result => new Property(result));
                 device.addProperties(properties);
                 return device;
               });
  }

  public fetchDevicesAndVariablesForProject(project: Project): ReplaySubject<any> {
    let returnedData = new ReplaySubject(1);

    let firstObservable = Observable.forkJoin(
      this.getVariables(project),
      this.getDevices(project)
    );

    firstObservable.subscribe(data => {
      let variables: Array<Variable> = data[0];
      let devices: Array<Device> = data[1];

      returnedData.next(project);
    }, err => {
      console.error(err);
      returnedData.error(err);
    });

    return returnedData;
  }

  public fetchSensorGraphsForProject(project: Project): ReplaySubject<any> {
    let returnedData = new ReplaySubject(1);
    let slugDict = {};
    let observables = [];

    // 1.- Build a set of unique sensor graphs for all devices in project
    project && project.devices.forEach(device => {
      let sgSlug: string = device.sensorGraphSlug;
      slugDict[sgSlug] = 'found';
    });

    // 2.- Build a list of required Observables (one per slug)
    let sgSlugList: Array<string> = Object.keys(slugDict);
    if (sgSlugList.length === 0) {
      // Return Project as is if no SGs
      returnedData.next(project);
    }
    console.log('Required SGs: ', sgSlugList);
    sgSlugList.forEach(slug => {
      observables.push(this.getSensorGraph(slug));
    });

    // 3.- Now do the actuall HTTP GETs
    let firstObservable = Observable.forkJoin(observables);
    firstObservable.subscribe(data => {
      let sgMap = {};
      data.forEach(sg => {
        let slug: string = sg['slug'];
        sgMap[slug] = <SensorGraph> sg;
      });

      // 4.- Finally, update all Device objects with their SensorGraph
      project.devices.forEach(device => {
        let sgSlug: string = device.sensorGraphSlug;
        if (sgMap[sgSlug]) {
          device.sg = sgMap[sgSlug];
        } else {
          console.error('SG ' + sgSlug + ' not found for Device ' + device.slug);
        }
      });

      returnedData.next(project);
    }, err => {
      console.error(err);
      returnedData.error(err);
    });

    return returnedData;
  }

  public getProject(projectId: string): Observable<any> {
    let url = '/project/' + projectId;
    return this._get(url)
               .map((p: Project) => new Project(p),
                     err => console.error(err));
  }

  public fetchProjectWithAssociatedData(projectId): Observable<Project> {
    let url = '/project/' + projectId;

    return this.getProject(projectId).flatMap((p: Project) => {
      return this.fetchDevicesAndVariablesForProject(p).flatMap(p => {
        return this.fetchSensorGraphsForProject(p).map(project => {
          return project;
        });
      });
    });
  }
}
