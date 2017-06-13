import 'rxjs/add/operator/publishReplay';
import { Observable, AsyncSubject } from 'rxjs/Rx';

import { Org } from './models/org';
import { Project } from './models/project';
import { VarType } from './models/vartype';
import { SensorGraph } from './models/sensorgraph';
import { Variable } from './models/variable';
import { Device } from './models/device';
import { DataPoint } from './models/datapoint';
import { DataFilterArgs } from './models/datafilterargs';
import { Property } from './models/property';

export class CloudServiceMock {

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

  public getSensorGraph(slug: string): Observable<SensorGraph> {
    let sg = new SensorGraph({
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

  public getAllData(returnedAsyncSubject: AsyncSubject<Array<DataPoint>>, dataArray: Array<DataPoint>, args: DataFilterArgs): Observable<Array<DataPoint>> {
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

  public getDeviceProperties(device: Device): Observable<Device> {
    let properties1: Array<Property> = [
      {
          id: 8,
          name: 'cargoDescription',
          value: 'Statement or description of the cargo.'
      },
      {
          id: 4,
          name: 'loadingType',
          value: 'Forklift'
      },
      {
          id: 1,
          name: 'shipFrom',
          value: 'Mountain View, CA'
      },
      {
          id: 2,
          name: 'shipTo',
          value: 'Seoul, South Korea'
      },
      {
          id: 3,
          name: 'shipVia',
          value: 'Airplane'
      },
      {
          id: 7,
          name: 'transportType',
          value: 'Air'
      }
    ];
    let properties = properties1.map(property => new Property(property));
    device.properties = properties;
    return Observable.of(device);
  }
}
