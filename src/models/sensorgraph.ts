import { DisplayWidget } from './displaywidget';

export interface SensorGraphDictionary {
  [index: string]: SensorGraph;
}

export class SensorGraph {
  public id: number;
  public name: string;
  public slug: string;
  public org: string;
  public projectTemplate: any;
  public variableTemplates: Array<any>;
  public displayWidgetTemplates: Array<DisplayWidget>;
  public uiExtra: any;
  public majorVersion: number;
  public minorVersion: number;
  public patchVersion: number;
  public createdOn: string;
  public rawData: string;

  constructor(data: any = {}) {
    this.id = data.id;
    this.name = data.name;
    this.slug = data.slug;
    this.org = data.org;
    this.projectTemplate = data.project_template;
    this.variableTemplates = data.variable_templates;
    this.uiExtra = data.ui_extra;
    this.majorVersion = data.major_version;
    this.minorVersion = data.minor_version;
    this.patchVersion = data.patch_version;
    this.createdOn = data.created_on;
    this.rawData = data;
    this.displayWidgetTemplates = [];

    if (!this.uiExtra) {
      this.uiExtra = {};
    }
    if ('display_widget_templates' in data) {
      data['display_widget_templates'].forEach((d: any) => {
        let widget: DisplayWidget = new DisplayWidget(d);
        this.displayWidgetTemplates.push(widget);
      });
    }
  }

  public getVersion(): string {
    return 'v' + [this.majorVersion, this.minorVersion, this.patchVersion].join('.');
  }

  public getUiExtra(type: string): any {
    if (this.uiExtra && this.uiExtra[type]) {
      return this.uiExtra[type];
    }
    return null;
  }

  public getIoInfo(type: string): any {
    if (this.getUiExtra(type)) {
      let uiExtra: any = this.getUiExtra(type);
      if (uiExtra.ioInfo && uiExtra.ioInfo.order && uiExtra.ioInfo.map) {
        return uiExtra.ioInfo;
      }
    }
    return null;
  }

  public toJson(): any {
    return this.rawData;
  }
}