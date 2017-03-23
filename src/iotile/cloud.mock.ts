import 'rxjs/add/operator/publishReplay';
import { Observable } from 'rxjs/Rx';

import { Org } from './models/org';
import { Project } from './models/project';
import { VarType } from './models/vartype';
import { SensorGraph } from './models/sensorgraph';

export class CloudServiceMock {

  public getOrgs(): Observable<any> {
    let orgs: Array<Org> = [];
    let o0: Org = new Org({
      name: 'My Org',
      slug: 'my-org'
    });
    orgs.push(o0);
    return Observable.of(orgs);
  }

  public getProjects(): Observable<any> {
    let projects: Array<Project> = [];
    let project0: Project = new Project({
      id: 'abc',
      gid: '0000-0001',
      name: 'My Project',
      org: 'my-org'
    });
    projects.push(project0);
    let project1: Project = new Project({
      id: 'def',
      gid: '0000-0002',
      name: 'His Project',
      org: 'his-org'
    });
    projects.push(project1);
    return Observable.of(projects);
  }

  public getVariableType(varSlug: string): Observable<VarType> {
    let varType: VarType = new VarType({
      "name": "Liquid Volume",
      "slug": varSlug,
      "available_input_units": [
        {
          "slug": "in--water-meter-volume--gallons",
          "unit_full": "Gallons",
          "unit_short": "g",
          "m": 378,
          "d": 100,
          "o": 0.0
        },
        {
          "slug": "in--water-meter-volume--liters",
          "unit_full": "Liters",
          "unit_short": "l",
          "m": 1,
          "d": 1,
          "o": 0.0
        }
      ],
      "available_output_units": [
        {
          "slug": "out--water-meter-volume--foo",
          "unit_full": "Foo",
          "unit_short": "g",
          "m": 100,
          "d": 378,
          "o": 0.0
        },
        {
          "slug": "out--water-meter-volume--bar",
          "unit_full": "Bar",
          "unit_short": "l",
          "m": 1,
          "d": 1,
          "o": 0.0
        }
      ],
      "storage_units_full": "Liters",
      "storage_units_short": "l"
    });
    return Observable.of(varType);
  }

  public getSensorGraph(slug: string): Observable<SensorGraph> {
    let sg = new SensorGraph({
      "id": 2,
      "name": "Water Meter",
      "slug": slug,
      "org": "arch-systems",
      "project_template": "water-meter-template-v0-0-0",
      "variable_templates": [
        {
          "id": 1,
          "label": "IO 1",
          "lid_hex": "5001",
          "derived_lid_hex": "",
          "var_type": "water-meter-volume",
          "m": 1,
          "d": 1,
          "o": 0.0,
          "app_only": false,
          "web_only": false
        },
        {
          "id": 2,
          "label": "IO 2",
          "lid_hex": "5002",
          "derived_lid_hex": "",
          "var_type": "water-meter-volume",
          "m": 1,
          "d": 1,
          "o": 0.0,
          "app_only": false,
          "web_only": false
        },
        {
          "id": 3,
          "label": "Pulse 1",
          "lid_hex": "100b",
          "derived_lid_hex": "",
          "var_type": "water-meter-volume",
          "m": 1,
          "d": 1,
          "o": 0.0,
          "app_only": true,
          "web_only": false
        },
        {
          "id": 4,
          "label": "Pulse 2",
          "lid_hex": "100c",
          "derived_lid_hex": "",
          "var_type": "water-meter-volume",
          "m": 1,
          "d": 1,
          "o": 0.0,
          "app_only": true,
          "web_only": false
        },
        {
          "id": 5,
          "label": "Odometer 1",
          "lid_hex": "100d",
          "derived_lid_hex": "",
          "var_type": "water-meter-volume",
          "m": 1,
          "d": 1,
          "o": 0.0,
          "app_only": true,
          "web_only": false
        },
        {
          "id": 6,
          "label": "Odometer 2",
          "lid_hex": "100e",
          "derived_lid_hex": "",
          "var_type": "water-meter-volume",
          "m": 1,
          "d": 1,
          "o": 0.0,
          "app_only": true,
          "web_only": false
        }
      ],
      "display_widget_templates": [
        {
          "id": 1,
          "label": "IO 1",
          "lid_hex": "5001",
          "var_type": "water-meter-volume",
          "derived_unit_type": "",
          "show_in_app": false,
          "show_in_web": false
        },
        {
          "id": 2,
          "label": "IO 2",
          "lid_hex": "5002",
          "var_type": "water-meter-volume",
          "derived_unit_type": "",
          "show_in_app": false,
          "show_in_web": false
        },
        {
          "id": 3,
          "label": "IO 1",
          "lid_hex": "5001",
          "var_type": "water-meter-volume",
          "derived_unit_type": "rate",
          "show_in_app": true,
          "show_in_web": false
        },
        {
          "id": 4,
          "label": "IO 2",
          "lid_hex": "5002",
          "var_type": "water-meter-volume",
          "derived_unit_type": "rate",
          "show_in_app": true,
          "show_in_web": false
        }
      ],
      "ui_extra": {
        "mobile": {
          "template": "water-meter",
          "ioInfo": {
            "map": {
              "5002": {
                "label": "IO 2",
                "settingsController": "waterMeterSettingsCtrl",
                "derived": {
                  "odometer": {
                    "lid": "100e",
                    "label": "Trip Computer"
                  },
                  "flow": {
                    "lid": "100c",
                    "label": "Flow"
                  }
                },
                "settingsTemplate": "water-meter-settings"
              },
              "5001": {
                "label": "IO 1",
                "settingsController": "waterMeterSettingsCtrl",
                "derived": {
                  "odometer": {
                    "lid": "100d",
                    "label": "Trip Computer"
                  },
                  "flow": {
                    "lid": "100b",
                    "label": "Flow"
                  }
                },
                "settingsTemplate": "water-meter-settings"
              }
            },
            "order": [
              "5001",
              "5002"
            ]
          },
          "controller": "waterMeterCtrl",
          "other": {
            "flowMdo": {
              "d": 65536
            }
          }
        }
      },
      "major_version": 0,
      "minor_version": 1,
      "patch_version": 0,
      "created_on": "2017-03-10T04:16:03.061729Z"
    });
    return Observable.of(sg);
  }

}