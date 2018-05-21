
import { Observable, ReplaySubject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/first';

import { DataBlock } from './models/datablock';
import { Org } from './models/org';
import { Project } from './models/project';
import { VarType } from './models/vartype';
import { SensorGraph } from './models/sensorgraph';
import { Variable } from './models/variable';
import { Device } from './models/device';
import { DataPoint } from './models/datapoint';
import { ProjectTemplate } from './models/projecttemplate';
import { DataFilterArgs } from './models/datafilterargs';
import { Property, PropertyTemplate } from './models/property';
import { Stream } from './models/stream';
import { ApiFilter } from './models/apifilter';
import { Member } from './models/member';
import { Invitation } from './models/invitation';
import { Note } from './models/note';
import { GeneratedReport } from './models/generated-report';

export class CloudServiceMock {

  public setApiEndPoint( s: string ): void {
    return;
  }

  public getOrgs(): Observable<any> {
    let orgs: Array<Org> = [];
    let o0: Org = new Org({
      name: 'My Org',
      slug: 'my-org',
      avatar: {
        thumbnail: 'https://image.com/thumbnail.jpg',
        tiny: 'https://image.com/tiny.jpg'
      }
    });
    orgs.push(o0);
    let o1: Org = new Org({
      name: 'His Org',
      slug: 'his-org',
      avatar: {
        thumbnail: 'https://image.com/thumbnail.jpg',
        tiny: 'https://image.com/tiny.jpg'
      }
    });
    orgs.push(o1);
    return Observable.of(orgs);
  }

  public getOrg(orgSlug: string, withExtraInfo?: boolean): Observable<Org> {
    let org: Org

    if (withExtraInfo) {
      org = new Org({
        "id": "564c54b5-19df-4fe0-9655-92542a2d0932",
        "name": "Arch - Internal",
        "slug": "arch-internal",
        "about": "Internal Projects for Testing",
        "created_on": "2016-11-04T00:48:13.033551Z",
        "created_by": "david",
        "avatar": {
            "thumbnail": "https://media.iotile.cloud/prod/images/3e5554ff-0e4d-4a10-b299-415e143c6931/thumbnail.jpg",
            "tiny": "https://media.iotile.cloud/prod/images/3e5554ff-0e4d-4a10-b299-415e143c6931/tiny.jpg"
        },
        "counts": {
            "fleets": 1,
            "projects": 32,
            "members": 12,
            "devices": 70,
            "networks": 0,
            "reports": 0,
            "datablocks": 36
        },
        "current_member":  {
          "user_details": {
            "email": "vanielle@arch-iot.com",
            "username": "lekosfmi",
            "name": "Vanielle Lee",
            "tagline": "",
            "avatar": {
              "thumbnail": "https://secure.gravatar.com/avatar/0828c899dcc84c7b50ac44b5a154b10c?d=identicon&s=80",
              "tiny": "https://secure.gravatar.com/avatar/0828c899dcc84c7b50ac44b5a154b10c?d=identicon&s=28"
            }
          },
          "created_on": "2017-04-13T03:12:39Z",
          "is_active": true,
          "is_org_admin": true
        }
      });
    } else {
      org = new Org({
        name: 'My Org',
        slug: 'my-org',
        avatar: {
          thumbnail: 'https://image.com/thumbnail.jpg',
          tiny: 'https://image.com/tiny.jpg'
        }
      });
    }

    return Observable.of(org);
  }

  public getProjects(): Observable<any> {
    let projects: Array<Project> = [];
    let project0: Project = new Project({
      id: 'b83c6bd6-0f3f-4890-a390-d9d29d142966',
      gid: '0000-0001',
      name: 'My Project',
      org: 'my-org',
      slug: 'p--0000-0001',
      about: '',
      page: {
        'slug': 'water-meter',
        'label': 'Water Meter',
        'id': 2
      }
    });
    projects.push(project0);
    let project1: Project = new Project({
      id: 'def',
      gid: '0000-0002',
      slug: 'p--0000-0002',
      name: 'His Project',
      org: 'his-org'
    });
    projects.push(project1);
    return Observable.of(projects);
  }

  public getVariableType(varSlug: string): Observable<VarType> {
    let varType: VarType = new VarType({
      'name': 'Liquid Volume',
      'slug': varSlug,
      'available_input_units': [
        {
          'slug': 'in--water-meter-volume--gallons',
          'unit_full': 'Gallons',
          'unit_short': 'g',
          'm': 378,
          'd': 100,
          'o': 0.0
        },
        {
          'slug': 'in--water-meter-volume--liters',
          'unit_full': 'Liters',
          'unit_short': 'l',
          'm': 1,
          'd': 1,
          'o': 0.0
        }
      ],
      'available_output_units': [
        {
          'slug': 'out--water-meter-volume--foo',
          'unit_full': 'Foo',
          'unit_short': 'g',
          'm': 100,
          'd': 378,
          'o': 0.0
        },
        {
          'slug': 'out--water-meter-volume--bar',
          'unit_full': 'Bar',
          'unit_short': 'l',
          'm': 1,
          'd': 1,
          'o': 0.0
        }
      ],
      'storage_units_full': 'Liters',
      'storage_units_short': 'l'
    });
    return Observable.of(varType);
  }

  public getProjectTemplate(slug: string): Observable<ProjectTemplate> {
    let pt: ProjectTemplate = new ProjectTemplate({
      'id': 7,
      'name': 'Default Template',
      'slug': 'default-template-v1-0-0',
      'org': 'arch-systems',
      'version': 'v1.0.0',
      'extra_data': {
        'web': {
          'projectTemplateSlug': 'default'
        }
      },
      'created_on': '2017-08-29T21:05:56.438500Z'
    });
    return Observable.of(pt);
  }

  public getSensorGraph(slug: string): Observable<SensorGraph> {
    let sg: SensorGraph = new SensorGraph({
      'id': 2,
      'name': 'Water Meter',
      'slug': slug,
      'org': 'arch-systems',
      'project_template': 'water-meter-template-v0-0-0',
      'variable_templates': [
        {
          'id': 1,
          'label': 'IO 1',
          'lid_hex': '5001',
          'derived_lid_hex': '',
          'var_type': 'water-meter-volume',
          'm': 1,
          'd': 1,
          'o': 0.0,
          'app_only': false,
          'web_only': false
        },
        {
          'id': 2,
          'label': 'IO 2',
          'lid_hex': '5002',
          'derived_lid_hex': '',
          'var_type': 'water-meter-volume',
          'm': 1,
          'd': 1,
          'o': 0.0,
          'app_only': false,
          'web_only': false
        },
        {
          'id': 3,
          'label': 'Pulse 1',
          'lid_hex': '100b',
          'derived_lid_hex': '',
          'var_type': 'water-meter-volume',
          'm': 1,
          'd': 1,
          'o': 0.0,
          'app_only': true,
          'web_only': false
        },
        {
          'id': 4,
          'label': 'Pulse 2',
          'lid_hex': '100c',
          'derived_lid_hex': '',
          'var_type': 'water-meter-volume',
          'm': 1,
          'd': 1,
          'o': 0.0,
          'app_only': true,
          'web_only': false
        },
        {
          'id': 5,
          'label': 'Odometer 1',
          'lid_hex': '100d',
          'derived_lid_hex': '',
          'var_type': 'water-meter-volume',
          'm': 1,
          'd': 1,
          'o': 0.0,
          'app_only': true,
          'web_only': false
        },
        {
          'id': 6,
          'label': 'Odometer 2',
          'lid_hex': '100e',
          'derived_lid_hex': '',
          'var_type': 'water-meter-volume',
          'm': 1,
          'd': 1,
          'o': 0.0,
          'app_only': true,
          'web_only': false
        }
      ],
      'display_widget_templates': [
        {
          'id': 1,
          'label': 'IO 1',
          'lid_hex': '5001',
          'var_type': 'water-meter-volume',
          'derived_unit_type': '',
          'show_in_app': false,
          'show_in_web': false
        },
        {
          'id': 2,
          'label': 'IO 2',
          'lid_hex': '5002',
          'var_type': 'water-meter-volume',
          'derived_unit_type': '',
          'show_in_app': false,
          'show_in_web': false
        },
        {
          'id': 3,
          'label': 'IO 1',
          'lid_hex': '5001',
          'var_type': 'water-meter-volume',
          'derived_unit_type': 'rate',
          'show_in_app': true,
          'show_in_web': false
        },
        {
          'id': 4,
          'label': 'IO 2',
          'lid_hex': '5002',
          'var_type': 'water-meter-volume',
          'derived_unit_type': 'rate',
          'show_in_app': true,
          'show_in_web': false
        }
      ],
      'ui_extra': {
        'mobile': {
          'template': 'water-meter',
          'ioInfo': {
            'map': {
              '5002': {
                'label': 'IO 2',
                'settingsController': 'waterMeterSettingsCtrl',
                'derived': {
                  'odometer': {
                    'lid': '100e',
                    'label': 'Trip Computer'
                  },
                  'flow': {
                    'lid': '100c',
                    'label': 'Flow'
                  }
                },
                'settingsTemplate': 'water-meter-settings'
              },
              '5001': {
                'label': 'IO 1',
                'settingsController': 'waterMeterSettingsCtrl',
                'derived': {
                  'odometer': {
                    'lid': '100d',
                    'label': 'Trip Computer'
                  },
                  'flow': {
                    'lid': '100b',
                    'label': 'Flow'
                  }
                },
                'settingsTemplate': 'water-meter-settings'
              }
            },
            'order': [
              '5001',
              '5002'
            ]
          },
          'controller': 'waterMeterCtrl',
          'other': {
            'flowMdo': {
              'd': 65536
            }
          }
        }
      },
      'major_version': 0,
      'minor_version': 1,
      'patch_version': 0,
      'created_on': '2017-03-10T04:16:03.061729Z'
    });
    return Observable.of(sg);
  }

  public getSensorGraphOrgProperties(
    slug: string,
    filter?: ApiFilter
  ): Observable<any> {
    let templates: Array<PropertyTemplate> = [];
    let pt1: PropertyTemplate = new PropertyTemplate({
      "id": 11,
      "org": "arch-systems",
      "type": "str",
      "name": "Customer",
      "default": "",
      "enums": [],
      "extra": {
          "order": 1,
          "header": {
              "order": 1
          },
          "ui": "text-field",
          "input_type": "text",
          "column_width": 6
      },
      "created_by": "david"
    });
    templates.push(pt1);
    let pt2: PropertyTemplate = new PropertyTemplate({
      "id": 12,
      "org": "arch-systems",
      "type": "str",
      "name": "Description",
      "default": "",
      "enums": [],
      "extra": {
          "order": 5,
          "header": {
              "order": 5
          },
          "ui": "text-field",
          "input_type": "text",
          "column_width": 12
      },
      "created_by": "david"
    });
    templates.push(pt2);

    return Observable.of(templates);

  }

  public getVariables(project: Project): Observable<any> {
    let vars: Array<Variable> = [];
    let var1: Variable = new Variable({
      'id': 'e83cdfaf-144e-478a-92b2-b05a52bea2ae',
      'name': 'IO 1',
      'lid': 20481,
      'var_type': 'water-meter-volume',
      'input_unit': {
        'slug': 'in--water-meter-volume--gallons',
        'unit_full': 'Gallons',
        'unit_short': 'g',
        'm': 378,
        'd': 100,
        'o': 0.0
      },
      'output_unit': {
        'slug': 'out--water-meter-volume--liters',
        'unit_full': 'Liters',
        'unit_short': 'l',
        'm': 2,
        'd': 1,
        'o': 0.0,
        'decimal_places': 2,
        'derived_units': {
          'rate': {
            'lph': {
              'd': 1,
              'm': 6
            },
            'lpm': {
              'd': 10,
              'm': 1
            }
          }
        }
      },
      'project': 'b83c6bd6-0f3f-4890-a390-d9d29d142966',
      'org': 'my-org',
      'about': 'Water flow rate (every 10min)',
      'created_on': '2017-01-22T23:29:45.813720Z',
      'units': 'Gallons',
      'multiplication_factor': 1,
      'division_factor': 10,
      'offset': 5.0,
      'decimal_places': 2,
      'mdo_label': '',
      'type': 'Num',
      'app_only': false,
      'slug': 'v--0000-0001--5001'
    });
    vars.push(var1);
    return Observable.of(vars);
  }

  public getDevices(project: Project): Observable<any> {
    let devs: Array<Device> = [];
    let device1 = new Device({
      'id': 129,
      'slug': 'd--0000-0000-0000-0081',
      'gid': '0000-0000-0000-0081',
      'label': 'The Device',
      'active': true,
      'project': 'b83c6bd6-0f3f-4890-a390-d9d29d142966',
      'org': 'my-org',
      'template': '1d1p2bt101-v0-1-0',
      'firmware_versions': [],
      'sg': 'single-soil-moisture-v1-1-0',
      'lat': 2.345676,
      'lon': -12.12345,
      'created_on': '2016-12-05T21:20:53.500516Z'
    });
    devs.push(device1);
    return Observable.of(devs);
  }

  public getData(args: DataFilterArgs): Observable<Array<DataPoint>> {
    let result: Array<DataPoint> = [];
    let point1: DataPoint = new DataPoint({
      'id': 880971,
      'stream': 's--0000-006f--0000-0000-0000-00ae--5001',
      'project': 'p--0000-006f',
      'device': 'd--0000-0000-0000-00ae',
      'variable': 'v--0000-006f--5001',
      'type': 'ITR',
      'device_timestamp': 9159600,
      'timestamp': '2017-05-31T23:26:16Z',
      'int_value': 2763,
      'value': 67.4725274725275,
      'streamer_local_id': 28027,
      'dirty_ts': false
    });
    result.push(point1);
    let point2: DataPoint = new DataPoint({
      'id': 880973,
      'stream': 's--0000-006f--0000-0000-0000-00ae--5001',
      'project': 'p--0000-006f',
      'device': 'd--0000-0000-0000-00ae',
      'variable': 'v--0000-006f--5001',
      'type': 'ITR',
      'device_timestamp': 9160200,
      'timestamp': '2017-05-31T23:36:16Z',
      'int_value': 2758,
      'value': 67.3504273504274,
      'streamer_local_id': 28028,
      'dirty_ts': false
    });
    result.push(point2);
    let point3: DataPoint = new DataPoint({
      'id': 880975,
      'stream': 's--0000-006f--0000-0000-0000-00ae--5001',
      'project': 'p--0000-006f',
      'device': 'd--0000-0000-0000-00ae',
      'variable': 'v--0000-006f--5001',
      'type': 'ITR',
      'device_timestamp': 9160800,
      'timestamp': '2017-05-31T23:46:16Z',
      'int_value': 2749,
      'value': 67.1306471306471,
      'streamer_local_id': 28029,
      'dirty_ts': false
    });
    result.push(point3);
    return Observable.of(result);
  }

  public getAllStreamData(stream: Stream, args: DataFilterArgs): ReplaySubject<any>  {
    let returnedData = new ReplaySubject(1);

    args.filter = stream.slug;
    this.getData(args).subscribe(data => {

      let totalCount = 0;
      data.forEach(item => {
          stream.data.push(item);
          totalCount++;
      });
      returnedData.next(totalCount);
    });

    return returnedData;
  }

  public getDeviceProperties(device: Device): Observable<Device> {
    let properties: Array<Property> = [];

    let property1 = new Property({
      id: 4,
      name: 'loadingType',
      value: 'Forklift'
    });
    properties.push(property1);

    let property2 = new Property({
      id: 3,
      name: 'shipVia',
      value: 'Airplane'
    });
    properties.push(property2);

    device.addProperties(properties);
    return Observable.of(device);
  }

  public fetchDevicesAndVariablesForProject(project: any): ReplaySubject<any> {
    let proj = new Project(project);

    let returnedData = new ReplaySubject(1);

    let devices: Array<Device> = [];

    let device1 = new Device({
      'id': 130,
      'slug': 'd--0000-0000-0000-0082',
      'gid': '0000-0000-0000-0082',
      'label': 'South Field',
      'active': true,
      'firmware_versions': [],
      'sg': 'water-meter-v1-1-0',
      'template': '1d1p2bt103-v3-0-0',
      'org': 'arch-farms',
      'project': '106d8ab9-3e5c-4834-8d90-d130a020058d',
      'lat': null,
      'lon': null,
      'created_on': '2017-03-25T00:47:43.690784Z'
    });

    devices.push(device1);

    let device2 = new Device({
      'id': 173,
      'slug': 'd--0000-0000-0000-00ad',
      'gid': '0000-0000-0000-00ad',
      'label': 'IOTile Device (00ad)',
      'active': true,
      'firmware_versions': [],
      'sg': 'single-soil-moisture-v2-0-0',
      'template': 'rpigateway-v0-1-0',
      'org': 'arch-farms',
      'project': '106d8ab9-3e5c-4834-8d90-d130a020058d',
      'lat': null,
      'lon': null,
      'created_on': '2017-03-31T01:14:52.254065Z'
    });

    devices.push(device2);

    proj.addDevices(devices);

    let variables: Array<Variable> = [];

    let variable1 = new Variable({
      'id': '7abc2be6-cc7e-4f37-8fba-cfe758f7dd0a',
      'name': 'Odometer 1',
      'lid': 4109,
      'var_type': 'water-meter-volume',
      'input_unit': {
        'slug': 'in--water-meter-volume--gallons',
        'unit_full': 'Gallons',
        'unit_short': 'G',
        'm': 378541,
        'd': 100000,
        'o': 0.0
      },
      'output_unit': {
        'slug': 'out--water-meter-volume--gallons',
        'unit_full': 'Gallons',
        'unit_short': 'G',
        'm': 100000,
        'd': 378541,
        'o': 0.0,
        'decimal_places': 0,
        'derived_units': {
          'rate': {
            'gph': {
              'm': 6,
              'd': 1
            },
            'gpm': {
              'm': 1,
              'd': 10
            }
          }
        }
      },
      'derived_variable': null,
      'project': '106d8ab9-3e5c-4834-8d90-d130a020058d',
      'org': 'arch-farms',
     'about': '',
     'created_on': '2017-03-25T00:47:43.979302Z',
     'type': 'N/A',
     'raw_value_format': '<L',
     'units': '',
     'multiplication_factor': 1,
     'division_factor': 1,
     'offset': 0.0,
     'decimal_places': 2,
     'mdo_label': '',
     'web_only': false,
     'app_only': true,
     'slug': 'v--0000-0009--100d'
    });

    variables.push(variable1);

    let variable2 = new Variable({
      'id': '04b35860-fe62-4897-a2c9-500818fbd4bd',
      'name': 'Pulse 1',
      'lid': 4107,
      'var_type': 'water-meter-flow',
      'input_unit': {
        'slug': 'in--water-meter-flow--gallons',
        'unit_full': 'Gallons',
        'unit_short': 'G',
        'm': 3785,
        'd': 65536000,
        'o': 0.0
      },
      'output_unit': {
        'slug': 'out--water-meter-flow--gallons-per-min',
        'unit_full': 'Gallons per Min',
        'unit_short': 'GPM',
        'm': 100000,
        'd': 378541,
        'o': 0.0,
        'decimal_places': 1,
        'derived_units': {}
      },
      'derived_variable': null,
      'project': '106d8ab9-3e5c-4834-8d90-d130a020058d',
      'org': 'arch-farms',
      'about': '',
      'created_on': '2017-03-25T00:47:43.868087Z',
      'type': 'N/A',
      'raw_value_format': '<L',
      'units': '',
      'multiplication_factor': 1,
      'division_factor': 1,
      'offset': 0.0,
      'decimal_places': 2,
      'mdo_label': '',
      'web_only': false,
      'app_only': true,
      'slug': 'v--0000-0009--100b'
    });

    variables.push(variable2);

    proj.addVariables(variables);

    returnedData.next(proj);

    return returnedData;
  }

  fetchSensorGraphsForProject(project: Project): ReplaySubject<any> {
    let proj = new Project(project);

    let returnedData = new ReplaySubject(1);

    let device = new Device({
      'id': 173,
      'slug': 'd--0000-0000-0000-00ad',
      'gid': '0000-0000-0000-00ad',
      'label': 'IOTile Device (00ad)',
      'active': true,
      'firmware_versions': [],
      'sg': 'single-soil-moisture-v2-0-0',
      'template': 'rpigateway-v0-1-0',
      'org': 'arch-farms',
      'project': '106d8ab9-3e5c-4834-8d90-d130a020058d',
      'lat': null,
      'lon': null,
      'created_on': '2017-03-31T01:14:52.254065Z'
    });

    let sensorgraph = new SensorGraph({
      'id': 3,
      'name': 'Single Soil Moisture',
      'slug': 'single-soil-moisture-v2-0-0',
      'org': 'arch-systems',
      'project_template': 'default-template-v1-0-0',
      'variable_templates': [
        {
          'id': 7,
          'label': 'IO 1',
          'lid_hex': '5003',
          'derived_lid_hex': '',
          'var_type': 'soil-moisture-percent',
          'default_input_unit': 'in--soil-moisture-percent--percent',
          'default_output_unit': 'out--soil-moisture-percent--percent',
          'ctype': 'unsigned int',
          'm': 1,
          'd': 1,
          'o': 0.0,
          'app_only': false,
          'web_only': false
        },
        {
          'id': 8,
          'label': 'Sensor 1',
          'lid_hex': '100f',
          'derived_lid_hex': '',
          'var_type': 'soil-moisture-percent',
          'default_input_unit': 'in--soil-moisture-percent--percent',
          'default_output_unit': 'out--soil-moisture-percent--percent',
          'ctype': 'unsigned int',
          'm': 1,
          'd': 1,
          'o': 0.0,
          'app_only': true,
          'web_only': false
        }
      ],
      'display_widget_templates': [
        {
          'id': 7,
          'label': 'IO 1',
          'lid_hex': '5003',
          'var_type': 'soil-moisture-percent',
          'derived_unit_type': '',
          'show_in_app': false,
          'show_in_web': true
        },
        {
          'id': 8,
          'label': 'IO Realtime 1',
          'lid_hex': '100f',
          'var_type': 'soil-moisture-percent',
          'derived_unit_type': '',
          'show_in_app': true,
          'show_in_web': false
        }
      ],
      'ui_extra': {
        'web': {
          'pageTemplateSlug': 'default'
        },
        'mobile': { }
      },
      'major_version': 2,
      'minor_version': 0,
      'patch_version': 0,
      'created_on': '2017-03-25T00:46:03.712704Z'
    });

    device.sg = sensorgraph;

    proj.addDevices([device]);

    returnedData.next(proj);
    return returnedData;
  }

  public getProject(projectId: string, withExtraInfo?: boolean): Observable<Project> {
    let mockProjectId = '2c8dadd7-add0-4157-90cd-036bcc178ec9';
    projectId = mockProjectId;

    let project: Project;

    if (withExtraInfo) {
      project = new Project({
        'id': '106d8ab9-3e5c-4834-8d90-d130a020058d',
        'name': 'Water Usage',
        'slug': 'p--0000-0009',
        'gid': '0000-0009',
        'org': 'arch-farms',
        'about': 'South Fields',
        'project_template': 'water-meter-permanent-v1-0-0',
        "counts": {
          "active_devices": 1,
          "inactive_devices": 1,
          "variables": 4,
          "streams": 6
        },
        'created_on': '2017-03-25T00:47:43.630348Z',
        'created_by': 'david'
      });
    } else {
      project = new Project({
        'id': '106d8ab9-3e5c-4834-8d90-d130a020058d',
        'name': 'Water Usage',
        'slug': 'p--0000-0009',
        'gid': '0000-0009',
        'org': 'arch-farms',
        'about': 'South Fields',
        'project_template': 'water-meter-permanent-v1-0-0',
        'created_on': '2017-03-25T00:47:43.630348Z',
        'created_by': 'david'
      });
    }

    return Observable.of(project);
  }

  fetchProjectWithAssociatedData(projectId: string): Observable<Project> {
    let mockProjectId = '2c8dadd7-add0-4157-90cd-036bcc178ec9';
    projectId = mockProjectId;

    return this.getProject(projectId).mergeMap((p: Project) => {
      return this.fetchDevicesAndVariablesForProject(p).mergeMap(p => {
        return this.fetchSensorGraphsForProject(p).map(project => {
          return project;
        });
      });
    });
  }

  getDataBlocks(orgSlug: string): Observable<Array<DataBlock>> {
    let result: Array<DataBlock> = [];
    let mockArchive: DataBlock = new DataBlock({
      'id': 1,
      'slug': 'b--0001-0000-0000-0087',
      'title': 'from singapore to hong kong',
      'sg': 'saver-v1-1-0',
      'org': 'kt-savers',
      'block': 1,
      'created_on': '2017-08-29T01:04:06.572379Z',
      'created_by': 'vanielle'
    });
    result.push(mockArchive);

    let mockArchive2: DataBlock = new DataBlock({
      'id': 1,
      'slug': 'b--0001-0000-0000-0087',
      'title': 'from singapore to hong kong',
      'org': 'kt-savers',
      'block': 1,
      'created_on': '2017-08-29T01:04:06.572379Z',
      'created_by': 'vanielle'
    });
    result.push(mockArchive2);

    return Observable.of(result);
  }

  getDataBlock(dataBlockSlug: string): Observable<DataBlock> {
    let mockDataBlock: DataBlock = new DataBlock({
      'id': 1,
      'slug': 'b--0001-0000-0000-0087',
      'title': 'from singapore to hong kong',
      'sg': 'saver-v1-1-0',
      'org': 'kt-savers',
      'block': 1,
      'created_on': '2017-08-29T01:04:06.572379Z',
      'created_by': 'vanielle'
    });
    return Observable.of(mockDataBlock);
  }

  public getStream(streamSlug: string, filter?: ApiFilter): Observable<Stream> {
    let url: string = '/stream/' + streamSlug + '/';

    if (filter) {
      url += filter.filterString();
    }

    let stream = new Stream({
      "id": "77e99c12-fe47-40df-a47a-b9e62a5b3ef6",
      "project_id": "30b489b4-fb8d-4417-8370-25e54a415bfa",
      "project": "p--0000-0001",
      "device": "d--0000-0000-0000-0082",
      "block": null,
      "data_label": "",
      "variable": "v--0000-0001--100a",
      "var_type": "water-meter-flow",
      "var_name": "Current Flow",
      "var_lid": 4106,
      "input_unit": {
        "slug": "in--water-meter-flow--gallons",
        "unit_full": "Gallons",
        "unit_short": "G",
        "m": 3785,
        "d": 65536000,
        "o": 0.0
      },
      "output_unit": {
        "slug": "out--water-meter-flow--gallons-per-min",
        "unit_full": "Gallons per Min",
        "unit_short": "GPM",
        "m": 100000,
        "d": 378541,
        "o": 0.0,
        "decimal_places": 1,
        "derived_units": {}
      },
      "derived_stream": null,
      "raw_value_format": "<L",
      "mdo_type": "S",
      "mdo_label": "",
      "multiplication_factor": 1,
      "division_factor": 1,
      "offset": null,
      "org": "ott-farms",
      "created_on": "2016-11-04T00:48:37.468055Z",
      "slug": "s--0000-0001--0000-0000-0000-0082--100a",
      "enabled": true
    });

    return Observable.of(stream);
  }

  public getCurrentUserMembership(orgSlug: string): Observable<Member> {

    let member = new Member({
      "user_details": {
        "email": "vanielle@arch-iot.com",
        "username": "lekosfmi",
        "name": "Vanielle Lee",
        "tagline": "",
        "avatar": {
          "tiny": "https://secure.gravatar.com/avatar/0828c899dcc84c7b50ac44b5a154b10c?d=identicon&s=28",
          "thumbnail": "https://secure.gravatar.com/avatar/0828c899dcc84c7b50ac44b5a154b10c?d=identicon&s=80"
        }
      },
      "created_on": "2017-04-13T03:12:39.109875Z",
      "is_active": true,
      "is_org_admin": true
    });

    return Observable.of(member);
  }

  public getMembersForOrg(org: Org): Observable<Org> {
    let members: Array<Member> = [];

    let member1 = new Member({
      "user_details": {
        "email": "vanielle@arch-iot.com",
        "username": "lekosfmi",
        "name": "Vanielle Lee",
        "tagline": "",
        "avatar": {
          "tiny": "https://secure.gravatar.com/avatar/0828c899dcc84c7b50ac44b5a154b10c?d=identicon&s=28",
          "thumbnail": "https://secure.gravatar.com/avatar/0828c899dcc84c7b50ac44b5a154b10c?d=identicon&s=80"
        }
      },
      "created_on": "2017-04-13T03:12:39.109875Z",
      "is_active": true,
      "is_org_admin": true
    });

    members.push(member1);

    let member2 = new Member({
      "user_details": {
        "email": "david@arch-iot.com",
        "username": "david",
        "name": "David Karchmer",
        "tagline": "The Web Master",
        "avatar": {
          "tiny": "https://secure.gravatar.com/avatar/d7655ebeb646997cf070a3531bed3550?s=28&d=identicon",
          "thumbnail": "https://secure.gravatar.com/avatar/d7655ebeb646997cf070a3531bed3550?s=80&d=identicon"
        }
      },
      "created_on": "2016-11-04T00:48:13.038650Z",
      "is_active": true,
      "is_org_admin": true
    });

    members.push(member2)

    org.addMembers(members);

    return Observable.of(org);
  }

  public getOrgPendingInvites(org: Org): Observable<Org> {
    let o0: Org = new Org({
      name: 'My Org',
      slug: 'my-org',
      avatar: {
        thumbnail: 'https://image.com/thumbnail.jpg',
        tiny: 'https://image.com/tiny.jpg'
      }
    });

    let pendingInvites: Array<Invitation> = [];
    let pendingInvite1: Invitation = new Invitation({
      "email": "david@gmail.com",
      "sent_on": "2018-01-31T02:45:59Z",
      "sent_by": "lekosfmi"
    });

    pendingInvites.push(pendingInvite1);

    let pendingInvite2: Invitation = new Invitation({
      "email": "tallis@gmail.com",
      "sent_on": "2018-01-31T02:45:59Z",
      "sent_by": "andrew"
    });


    pendingInvites.push(pendingInvite2);

    org.addPendingInvites(pendingInvites);

    return Observable.of(org);
  }

  public postOrgInvite(org: Org, invitation: Invitation): Observable<Invitation>  {
    // return an observable
    let payload: Invitation = invitation.postPayload();

    return Observable.of(payload);
  }

  public postOrg(orgName: string): string {
    return orgName;
  }

  public getNotes(slug: string): Observable<Array<Note>> {
    let mockNotes: Array<Note> = [];

    let mockNote1 = new Note({
      "id": 1,
      "target": "d--0000-0000-0000-0059",
      "type": 'ui',
      "timestamp": "2017-10-16T18:43:38.354000Z",
      "note": "The cargo has arrived in Seoul, South Korea successfully"
    });

    mockNotes.push(mockNote1)

    let mockNote2 = new Note({
      "id": 2,
      "target": "d--0000-0000-0000-0059",
      "type": 'ui',
      "timestamp": "2017-10-16T18:43:38.571000Z",
      "note": "The device with ID of d--0000-0000-0000-0059 rebooted"
    });

    mockNotes.push(mockNote2)

    let mockNote3 = new Note({
      "id": 3,
      "target": "d--0000-0000-0000-0059",
      "type": 'ui',
      "timestamp": "2017-10-16T18:43:38.571000Z",
      "note": "The device was resetted by @david"
    });

    mockNotes.push(mockNote3)

    return Observable.of(mockNotes);
  }

  public getGeneratedReport(apiFilter?: ApiFilter): Observable<GeneratedReport[]> {
    let generatedReportJSON = {
      "id": "98112efa-b09b-412e-8937-ef7223033288",
      "label": "stream_overview: b--0008-0000-0000-053a",
      "source_ref": "b--0008-0000-0000-053a",
      "user_info": {
        "username": "@david.karchmer",
        "slug": "davidkarchmer",
        "tiny_avatar": "https://secure.gravatar.com/avatar/8263c80c650435c2f578803d6853c4b1?d=identicon&s=28"
      },
      "url": null,
      "created_on": "2018-05-05T16:32:31Z",
      "created_by": "davidkarchmer",
      "org": "karchmer",
      "index_file": {
        "id": "98112efa-b09b-412e-8937-ef7223033288",
        "title": "stream_overview: b--0008-0000-0000-053a",
        "url": "https://iotile-cloud-reports.s3.amazonaws.com/prod/shared/karchmer/98112efa-b09b-412e-8937-ef7223033288/out.html?AWSAccessKeyId=ASIAJ3BO4OTWONQYIQ3A&Signature=Eg7Y0YSHOV4o7l3acbRRXnE9rAY%3D&x-amz-security-token=FQoDYXdzEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDFK2xY3NW1tjdqlSViK3A%2Bg%2BUIvM3Ha1lX2fQVkoqvBHr6eE%2BMhBPKqCR%2FLjonaWE4hiu4iADUPxiyasck%2BVGl2Owu1QoFbAKtYKFVOt%2FXfMcRSAEWzAZSP1S06NUz%2FIu6EBdOCRJUwHGC6L5uYDqi3B84nt%2BIN8I%2B4QTLrS7QghfQH%2FhTuHBxZGgy5BhyAnL7UxGMfh5bKolgl6cmeOchayQFmkDWkFuEmN7CgocLARz0CbDS%2BtCGhAPPS35J%2B30Ubv15wXrLG7OdTfA0TP2g40uPx9VYTml0PDKKIjyeTbbWXsaq0mpH8VkrKstLf93HeSTvlW4Cu9AvHbcFvQ0uLvWTLpitwUww0TmITQ7oUy8yCglJLbLv3f9ReibxkvrJ%2F1RXc3pky6h9eoiwqRKroH913jD4QEoXQgmAIAw%2Bw2hWG4hqbr9DagdMZCzJeIEqtdin1RjfTXl3N%2BcMgh9uJU5NsZWsZ6463RXJI%2Bv7TSbJ3LEaBdL8CQe3yxWZJjDAMm%2BcEEAG0p3KNto3mIaIOhrVMgCClqAQmt1XiF1aqEwgeHzAl1VvTkXIR%2FrRf5RlMqb5TOAc%2BlHojyAGyuv8X6KxFer2so6JDT1wU%3D&Expires=1526000319",
        "file_type": "html",
        "created_on": "2018-05-05T16:32:33Z",
        "created_by": 31
      },
      "status": "G1"
    };

    let generatedReports: GeneratedReport[] = [new GeneratedReport(generatedReportJSON)];

    return Observable.of(generatedReports);
  }

  public postGeneratedReport(generatedReport: GeneratedReport): Observable<GeneratedReport> {
    let payload = generatedReport.getSchedulPostPayload();

    if (!payload) {
      return Observable.onErrorResumeNext();
    }

    return Observable.of(generatedReport);
  }
}
