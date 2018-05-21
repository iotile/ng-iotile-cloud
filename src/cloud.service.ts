import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, ReplaySubject } from 'rxjs/Rx';
import { map, publishReplay, mergeMap, first } from 'rxjs/operators';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/of';

import {
  DataBlock,
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
  SensorGraphDictionary,
  ProjectTemplate,
  DataFilterArgs,
  Property,
  PropertyTemplate,
  Fleet,
  FleetDevice,
  ApiFilter,
  Member,
  Invitation,
  InvitationPendingDictionary,
  Note,
  GeneratedReport,
  ReportPostPayoad
} from './models/index';

/*
  Generated class for the CloudService provider.

  Main Service for getting and posting data from/to https://iotile.cloud
*/
export interface SlugDictionary {
  [index: string]: string;
}

@Injectable()
export class CloudService {
  private _apiEndpoint: string;
  private _token: string;

  constructor(
    private _http: HttpClient
  ) { }

  private _createAuthorizationHeader(): HttpHeaders {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    if (this._token) {
      return headers.set('Authorization', 'JWT ' + this._token);
    } else {
      return headers;
    }
  }

  private _getRequestOptions(): any {
    const headers = this._createAuthorizationHeader();
    return { headers };
  }

  //TODO: use get<T>
  public get(url: string): Observable<any> {
    const options = this._getRequestOptions();
    return this._http.get(this._apiEndpoint + url, options);
  }

  public patch(url: string, payload: any): Observable<any>  {
    const options = this._getRequestOptions();
    return this._http.patch(this._apiEndpoint + url, payload, options);
  }

  public post(url: string, payload: any): Observable<any>  {
    const options = this._getRequestOptions();
    return this._http.post(this._apiEndpoint + url, payload, options);
  }

  public setApiEndPoint (url: string): void {
    this._apiEndpoint = url;
  }

  public setToken (token: string): void {
    this._token = token;
  }

  public clearToken (): void {
    this._token = '';
  }

  public authenticate(credentials: Credentials): Observable<any> {
    console.debug('[CloudService] Authenticating @' + credentials.username);
    let options = this._getRequestOptions();

    let payload: {} = credentials.getPayload();

    return this._http.post(this._apiEndpoint + '/auth/api-jwt-auth/', payload, options)
      .map( // Log the result or error
        response => {
          let data: any = response;

          // login successful if there's a jwt token in the response
          if (data && data.token) {
              this._token = data.token;
              return this._token;
          }
        }
      );
  }

  public getUserInfo(): Observable<any> {

    return this.get('/account/')
      .publishReplay(1).refCount()
      .map((results: any) => {
        let user: User | undefined;
        if (results) {
          let rawData: {} = results['results'][0];
          user = new User(rawData);
        }
        return user;
      });
  }

  public getProjectTemplate(slug: string): Observable<ProjectTemplate> {
    // return an observable
    return this.get('/pt/' + slug + '/')
      .map((data: any) => {
        return new ProjectTemplate(data);
      });
  }

  public getSensorGraphs(): Observable<any> {
    // return an observable
    return this.get('/sg/')
      .publishReplay(1).refCount()
      .map((sgs: any) => {
        let result: Array<SensorGraph> = [];
        if (sgs) {
          sgs['results'].forEach((item: any) => {
            result.push(
              new SensorGraph(item));
          });
        }
      });
  }

  public getSensorGraph(slug: string): Observable<SensorGraph> {
    // return an observable
    return this.get('/sg/' + slug + '/')
      .map((data: any) => {
        return new SensorGraph(data);
      });
  }

  public getSensorGraphOrgProperties(
    slug: string,
    filter?: ApiFilter
  ): Observable<any> {
    let url: string = '/sg/' + slug + '/property/';
    if (filter) {
      url += filter.filterString();
    }
    return this.get(url)
      .map((data: any) => {
        let result: Array<PropertyTemplate> = [];
        if (data) {
          data['results'].forEach((item: any) => {
            result.push(
              new PropertyTemplate(item)
            );
          });
        }
        return result;
      });
  }

  public getOrgs(filter?: ApiFilter): Observable<any> {
    let url: string = '/org/';
    if (filter) {
      url += filter.filterString();
    }
    return this.get(url)
      .publishReplay(1).refCount()
      .map((orgs: any) => {
        let result: Array<Org> = [];
        if (orgs) {
          orgs['results'].forEach((item: any) => {
            result.push(
              new Org(item)
            );
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

  public getOrg(orgSlug: string, withExtraInfo?: boolean): Observable<Org> {
    let url: string = '/org/' + orgSlug + '/';
    if (withExtraInfo) {
      url += 'extra/';
    }

    return this.get(url).map((org: Org) => new Org(org));
  }

  public postOrg(org: Org): Observable<Org>  {
    // return an observable
    let payload: any = org.getPatchPayload();
    return this.post('/org/', payload)
      .map((data: any) => {
        return new Org(data);
      });
  }

  public getProjects(filter?: ApiFilter): Observable<any>  {

    let url: string = '/project/';
    if (filter) {
      url += filter.filterString();
    }
    return this.get(url)
      .publishReplay(1).refCount()
      .map((projects: any) => {
        let result: Array<Project> = [];
        if (projects) {
          projects['results'].forEach((item: any) => {
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
    return this.patch(url, payload)
      .map((data: any) => {
        return new Project(data);
      });
  }

  public getDevice(deviceSlug: string): Observable<Device>  {

    // return an observable
    let url: string = '/device/' + deviceSlug + '/';
    return this.get(url)
      .map((data: any) => {
        return new Device(data);
      });
  }

  public patchDevice(device: Device): Observable<Device>  {

    // return an observable
    let deviceSlug: string = device.slug;
    let url: string = '/device/' + deviceSlug + '/';
    let payload: any = device.getPatchPayload();
    return this.patch(url, payload)
      .map((data: any) => {
        return new Device(data);
      });
  }

  public getVariable(varSlug: string): Observable<Variable>  {

    // return an observable
    let url: string = '/variable/' + varSlug + '/';
    return this.get(url)
      .map((data: any) => {
        return new Variable(data);
      });
  }

  public getVariableTypeByVariable(varSlug: string): Observable<VarType>  {

    // return an observable
    let url: string = '/variable/' + varSlug + '/type/';
    return this.get(url)
      .map((data: any) => {
        return new VarType(data);
      });
  }

  public getVariableType(varTypeSlug: string): Observable<VarType>  {

    // return an observable
    let url: string = '/vartype/' + varTypeSlug + '/';
    return this.get(url)
      .map((data: any) => {
        return new VarType(data);
      });
  }

  public getAllVarTypes(): Observable<any>  {

    // return an observable
    let url: string = '/vartype/';
    return this.get(url)
      .map((data: any) => {
        let result: Array<VarType> = [];
        if (data) {
          data['results'].forEach((item: any) => {
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
    return this.get(url)
      .map((data: any) => {
        let result: Array<Variable> = [];
        if (data) {
          data['results'].forEach((item: any) => {
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
    return this.patch(url, payload)
      .map((data: any) => {
        return new Variable(data);
      });
  }

  public getDevices(project: Project, filter?: ApiFilter): Observable<any>  {
    // Merge the filter (if any) with the project filter we create here
    if (!filter) {
      filter = new ApiFilter();
    }
    filter.addFilter('project', project.id);
    let url: string = '/device/' + filter.filterString();
    // return an observable
    return this.get(url)
      .map((data: any) => {
        let result: Array<Device> = [];
        if (data) {
          data['results'].forEach((item: any) => {
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
    let url: string = '/stream/?device=' + deviceSlug;
    if (projectId) {
      url += '&project=' + projectId;
    }
    return this.get(url)
      .map((data: any) => {
        let result: Array<Stream> = [];
        if (data) {
          data['results'].forEach((item: any) => {
            result.push(
              new Stream(item));
          });
        }
        return result;
      });
  }

  public getStream(streamSlug: string, filter?: ApiFilter): Observable<Stream>  {
    let url: string = '/stream/' + streamSlug + '/';

    if (filter) {
      url += filter.filterString();
    }

    return this.get(url)
      .map((data: any) => {
        return new Stream(data);
      });
  }

  public patchStream(stream: Stream): Observable<Stream>  {

    // return an observable
    let streamSlug: string = stream.slug;
    let url: string = '/stream/' + streamSlug + '/';
    let payload: any = stream.getPatchPayload();
    return this.patch(url, payload)
      .map((data: any) => {
        return new Stream(data);
      });
  }

  public getStreamStats(streamSlug: string, args: DataFilterArgs): Observable<any>  {

    // return an observable
    let url: string = '/stream/' + streamSlug + '/stats/';
    url += args.buildFilterString();

    return this.get(url)
      .map((data: any) => {
        return new Stats(data);
      });
  }

  public getPointCount(url: string): Observable<number>  {

    url += '&page_size=2';
    console.debug('[CloudService] GET: ' + url);
    return this.get(url)
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
    return this.get(url)
      .map((data: any) => {
        let result: Array<DataPoint> = [];
        if (data) {
          data['results'].forEach((item: any) => {
            result.push(new DataPoint(item));
          });
        }
        return result;
      });
  }

  public getSingleDataPage(dataPage: DataPage): Observable<DataPage>  {

    let url = dataPage.pageUrl();
    return this.get(url)
      .map((data: any) => {
        if (data) {
          data['results'].forEach((item: any) => {
            dataPage.data.push(new DataPoint(item));
          });
        }
        return dataPage;
      });
  }

  public getSingleEventPage(dataPage: EventPage): Observable<EventPage>  {

    let url = dataPage.pageUrl();
    return this.get(url)
      .map((data: any) => {
        if (data) {
          data['results'].forEach((item: any) => {
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
    this.getPointCount(url).subscribe(
      count => {

        // Reset pageSize to the default size to get proper sized data pages
        args.pageSize = 1000;
        let dataUrl = urlBase + args.buildFilterString();
        let pageCount = Math.ceil(count / args.pageSize);
        console.debug('No. of pages (to be forkJoin-ed): ' + count + '/' + args.pageSize + '=' + pageCount);
        if (pageCount === 0) {
          returnedData.next(pageCount);
        }

        let observables: Array<any> = [];

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
    });
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
    this.getPointCount(url).subscribe(
      count => {

        // Reset pageSize to the default size to get proper sized data pages
        args.pageSize = 1000;
        let dataUrl = urlBase + args.buildFilterString();
        let pageCount = Math.ceil(count / args.pageSize);
        console.debug('No. of pages (to be forkJoin-ed): ' + args.pageSize + '/' + count + '=' + pageCount);
        let observables: Array<any> = [];

        if (pageCount == 0) {
          returnedData.next(0);
          return;
        }

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
      });
    return returnedData;
  }

  public getEventDataContent(id: number): Observable<any>  {

    let url: string = '/event/' + id + '/data/';
    return this.get(url);
  }

  public uploadStreamData(payload: {}): Observable<any> {
    let options = this._getRequestOptions();
    // TODO: this._http.post or this.post ?
    return this._http.post(this._apiEndpoint + '/data/', payload, options)
      .map((res: any) => res);
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
    let slugDict: SlugDictionary = {};
    let observables: Array<any> = [];

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
    console.debug('Required SGs: ', sgSlugList);
    sgSlugList.forEach(slug => {
      observables.push(this.getSensorGraph(slug));
    });

    // 3.- Now do the actuall HTTP GETs
    let firstObservable = Observable.forkJoin(observables);
    firstObservable.subscribe(data => {
      let sgMap: SensorGraphDictionary = {};
      data.forEach((sg: any) => {
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

  public getProject(projectId: string, withExtraInfo?: boolean): Observable<any> {
    let url = '/project/' + projectId + '/';
    if (withExtraInfo) {
      url += 'extra/';
    }
    return this.get(url)
               .map((p: Project) => new Project(p),
                     (err: any) => console.error(err));
  }

  public fetchProjectWithAssociatedData(projectId: string): Observable<Project> {
    return this.getProject(projectId).mergeMap((p: Project) => {
      return this.fetchDevicesAndVariablesForProject(p).mergeMap(p => {
        return this.fetchSensorGraphsForProject(p).map(project => {
          return project;
        });
      });
    });
  }

  public getDataBlocks(filter?: ApiFilter): Observable<Array<DataBlock>> {
    let url = '/datablock/';
    if (filter) {
      url += filter.filterString();
    }

    return this.get(url).map((data: any) => {
      if (data.count > 0) {
        return data['results'].map((result: any) => new DataBlock(result));
      }
    }, (err: any) => console.error(err));
  }

  public getDataBlock(dataBlockSlug: string): Observable<DataBlock> {
    let url = '/datablock/' + dataBlockSlug + '/';
    return this.get(url).map((data: any) => {
      return new DataBlock(data);
    }, (err: any) => console.error(err));
  }

  public postDataBlock(dataBlock: DataBlock): Observable<DataBlock> {
    let payload = dataBlock.getPostPayload();
    return this.post('/datablock/', payload)
               .map((data: any) => {
                 return new DataBlock(data);
               }, (err: any) => console.error(err));
  }

  public getDeviceProperties(device: Device, filter?: ApiFilter): Observable<Device> {
    let url = '/device/' + device.slug + '/properties/';
    if (filter) {
      url += filter.filterString();
    }
    return this.get(url)
               .map((results: Array<Property>) => {
                 let properties: Array<Property> = results.map(result => new Property(result));
                 device.addProperties(properties);
                 return device;
               });
  }

  public getProjectProperties(project: Project, filter?: ApiFilter): Observable<Project> {
    let url = '/project/' + project.id + '/properties/';
    if (filter) {
      url += filter.filterString();
    }
    return this.get(url)
               .map((results: Array<Property>) => {
                 let properties: Array<Property> = results.map(result => new Property(result));
                 project.addProperties(properties);
                 return project;
               });
  }

  public postDeviceProperty(
    deviceSlug: string,
    property: Property
  ): Observable<Property> {
    let url = '/device/' + deviceSlug + '/new_property/';
    let payload = property.getPostPayload();
    return this.post(url, payload)
               .map((data: any) => {
                 return new Property(data);
               }, (err: any) => console.error(err));
  }

  public postProjectProperty(
    projectId: string,
    property: Property
  ): Observable<Property> {
    let url = '/project/' + projectId + '/new_property/';
    let payload = property.getPostPayload();
    return this.post(url, payload)
               .map((data: any) => {
                 return new Property(data);
               }, (err: any) => console.error(err));
  }

  public getFleets(filter?: ApiFilter): Observable<Array<Fleet>>  {

    let url: string = '/fleet/';
    if (filter) {
      url += filter.filterString();
    }
    return this.get(url)
      .map((data: any) => {
        let result: Array<Fleet> = [];
        if (data && 'results' in data) {
          data['results'].forEach((item: any) => {
            result.push(
              new Fleet(item));
          });
        }
        return result;
      });
  }

  public getFleet(fleetSlug: string): Observable<Fleet>  {

    let url: string = '/fleet/' + fleetSlug + '/';
    return this.get(url)
      .map((data: any) => {
        return new Fleet(data);
      });
  }

  public getFleetDevices(fleet: Fleet, filter?: ApiFilter): Observable<Fleet> {
    // Get all devices members for this fleet, and add them to the fleet

    let url: string = '/fleet/' + fleet.slug + '/devices/';
    if (filter) {
      url += filter.filterString();
    }
    return this.get(url)
      .map((data: any) => {
        if (data && 'results' in data) {
          data['results'].forEach((item: any) => {
            fleet.addDevice(new FleetDevice(item));
          });
        }
        return fleet;
      });
  }

  public registerDeviceFleet(fleetSlug: string, deviceSlug: string): Observable<any> {

    let url: string = '/fleet/' + fleetSlug + '/register/';
    let payload: any = {
      device: deviceSlug
    };
    return this.post(url, payload);
  }

  public deregisterDeviceFleet(fleetSlug: string, deviceSlug: string): Observable<any> {

    let url: string = '/fleet/' + fleetSlug + '/deregister/';
    let payload: any = {
      device: deviceSlug
    };
    return this.post(url, payload);
  }

  public getCurrentUserMembership(orgSlug: string): Observable<Member> {
    let url = '/org/' + orgSlug + '/membership/';

    return this.get(url).map(data => {
      return new Member(data);
    });
  }

  public getMembersForOrg(org: Org): Observable<Org> {
    let url = '/org/' + org.slug + '/members/';

    return this.get(url).map((data: any) => {
      let members: Array<Member> = [];
      data['results'].forEach((item: any) => members.push(new Member(item)));
      org.addMembers(members);
      return org;
    });
  }

  public getOrgPendingInvites(org: Org): Observable<Org> {
    let url = '/org/' + org.slug + '/pending/';

    return this.get(url).map((data: any) => {
      let pendingInvites: Array<Invitation> = [];
      data['results'].forEach((item: any) => pendingInvites.push(new Invitation(item)));
      org.addPendingInvites(pendingInvites);
      return org;
    });
  }

  public postOrgInvite(orgSlug: string, invitation: Invitation): Observable<string>  {
    let payload: Invitation = invitation.postPayload();
    let url: string = '/org/' + orgSlug + '/invite/';

    return this.post(url, payload).map((data: Invitation) => {
      let invitation = new Invitation(data);
      return invitation.email;
    });
  }

  public getNotes(slug: string): Observable<Array<Note>> {
    let url = `/note/?target=${slug}`;

    return this.get(url).map((res: any) => {
      let notes: Array<Note> = [];
      res.results.forEach((item: any) => {
        notes.push(new Note(item));
      });
      return notes;
    });
  }

  public postNote(note: Note): Observable<Note> {
    let payload = note.postPayload();
    let url = '/note/';

    return this.post(url, payload).map((n: any) => {
      console.info('#postNote ', n);
      return new Note(n);
    });
  }

  public getGeneratedReport(apiFilter?: ApiFilter): Observable<GeneratedReport[]> {
    let url: string = '/report/generated/';
    if (apiFilter) {
      url += apiFilter.filterString();
    }

    return this.get(url).map((data: any) => {
      let generatedReports: GeneratedReport[] = [];
      data['results'].forEach((item: any) => {
        generatedReports.push(new GeneratedReport(item))
      });

      console.info('[cloud.service] getGeneratedReport()', generatedReports);
      return generatedReports;
    });
  }

  public postGeneratedReport(generatedReport: GeneratedReport): Observable<GeneratedReport> {
    let url: string = '/report/generated/schedule/';

    let payload: ReportPostPayoad = generatedReport.getPostPayload();

    return this.post(url, payload).map((data: any) => {
      let generatedReport: GeneratedReport = new GeneratedReport(data);
      console.info('[cloud.service] postGeneratedReport()', generatedReport);
      return generatedReport;
    });
  }
}
