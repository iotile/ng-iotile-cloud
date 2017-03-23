'use strict';

import { Project } from '../../iotile/models/project';
import { SensorGraph } from '../../iotile/models/sensorgraph';

describe('SensorGraphTest', () => {
  const dummySg1 = new SensorGraph({
    "id": 2,
    "name": "Water Meter",
    "slug": "water-meter-v0-1-0",
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
const dummySg2 = new SensorGraph({
    "id": 2,
    "name": "Water Meter",
    "slug": "water-meter-v0-1-0",
    "org": "arch-systems",
    "project_template": "water-meter-template-v0-0-0",
    "variable_templates": [],
    "display_widget_templates": [],
    "ui_extra": {
      "mobile": {
        "template": "water-meter",
        "settingsTemplate": "water-meter-settings",
        "settingsController": "waterMeterSettingsCtrl",
        "ioInfo": null,
        "controller": "waterMeterCtrl"
      }
    },
    "major_version": 0,
    "minor_version": 1,
    "patch_version": 0,
    "created_on": "2017-03-10T04:16:03.061729Z"
  });
const dummySg3 = new SensorGraph({
    "id": 2,
    "name": "Water Meter",
    "slug": "water-meter-v0-1-0",
    "org": "arch-systems",
    "project_template": "water-meter-template-v0-0-0",
    "variable_templates": [],
    "display_widget_templates": [],
    "ui_extra": null,
    "major_version": 0,
    "minor_version": 1,
    "patch_version": 0,
    "created_on": "2017-03-10T04:16:03.061729Z"
  });
  
  it('check SensorGraph basics', () => {
    let sg: SensorGraph = dummySg1;
    expect(sg).toBeTruthy();
    expect(sg.name).toEqual('Water Meter');
    expect(sg.org).toEqual('arch-systems');
    expect(sg.getVersion()).toEqual('v0.1.0');
  });

  it('check SensorGraph uiExtra', () => {
    let sg: SensorGraph = dummySg1;
    expect(sg.uiExtra).toBeDefined();
    expect(sg.getUiExtra('mobile')).toBeDefined();
    expect(sg.getIoInfo('mobile')).toBeDefined();
  });

  it('check SensorGraph with available widgets', () => {
    let sg: SensorGraph = dummySg1;
    expect(sg.displayWidgetTemplates.length).toEqual(4);
    let widget0 = sg.displayWidgetTemplates[0];
    expect(widget0.show).toEqual(false);
    expect(widget0.label).toEqual('IO 1');
    let widget3 = sg.displayWidgetTemplates[3];
    expect(widget3.show).toEqual(true);
  });
  it('check SensorGraph without available templates', () => {
    let sg2: SensorGraph = dummySg2;
    expect(sg2.displayWidgetTemplates.length).toEqual(0);
  });

  it('check adding sensorgraph to Project', () => {
    let proj: Project = new Project({
      "id": "84e3869d-1fdb-4203-9b69-18b417e2b0e0",
      "name": "My Project",
      "slug": "p--0000-0012",
      "gid": "0000-0012",
      "org": "my-org",
      "created_by": "david"
    });
    let sg1: SensorGraph = dummySg1;
    let sg2: SensorGraph = dummySg2;
    proj.addSensorGraph(sg1);
    proj.addSensorGraph(sg2);
    expect(proj.sensorGraphs.length).toEqual(2);
    expect(proj.sensorGraphMap[sg1.slug].slug).toEqual(sg1.slug);
    expect(proj.sensorGraphMap[sg2.slug].name).toEqual('Water Meter');
  });
});