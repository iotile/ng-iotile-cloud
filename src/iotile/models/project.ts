import { Org } from './org';
import { Device } from './device';
import { Stream } from './stream';
import { Variable } from './variable';
import { Mdo } from './mdo';

export interface VariableDictionary {
    [ index: string ]: Variable
}

export class Project {
    public id: string;
    public gid: string;
    public name: string;
    public orgSlug: string;
    public pageTemplateId: number;
    public pageTemplateSlug: string;
    public pageTemplateLabel: string;

    public org: Org;
    public devices: Array<Device>;
    public streams: Array<Stream>;
    public variables: Array<Variable>;
    public variableMap: VariableDictionary;

    constructor(data: any = {}) {
      this.id = data.id;
      this.gid = data.gid;
      this.name = data.name;
      this.orgSlug = data.org;
      
      let page: any = data.page;
      if (page) {
        this.pageTemplateId = page['id'];
        this.pageTemplateSlug = page['slug'];
        this.pageTemplateLabel = page['label'];
      } else {
        // Assume default page
        this.pageTemplateId = 1;
        this.pageTemplateSlug = 'default';
        this.pageTemplateLabel = 'Dashboard';
      }
    }

    public addDevices(devices: Array<Device>): void {
      this.devices = devices;
    }

    public addStreams(streams: Array<Stream>): void {
      this.streams = streams;
    }

    public addVariables(variables: Array<Variable>): void {
      this.variables = variables;
      this.variableMap = {};
      this.variables.forEach(v => {
        this.variableMap[v.slug] = v;
      });
    }

    public getVariable(slug): Variable {
      return this.variableMap[slug];
    }

    public getVariableForStream(slug): Variable {
      if (slug) {
        let elements: Array<string> = slug.split('--');
        if (elements.length === 4) {
          let varSlug: string = 'v--' + elements[1] + '--' + elements[3];
          return this.getVariable(varSlug);
        }
      }
      return;
    }

    public computeValue(stream: Stream, value: number): number {
      let result: number;
      let mdo: Mdo;
      if (!stream) {
        return result;
      }
      let varSlug: string = stream.variable;
      let varObj: Variable = this.variableMap[varSlug];
      switch (stream.mdoType) {
        case 'S':
          mdo = stream.mdo;
          if (mdo) {
            result = mdo.computeValue(value);
          }
          break;
        case 'V':
          if (varObj && varObj.mdo) {
            mdo = varObj.mdo;
            result = mdo.computeValue(value);
          }
          break;
        case 'P':
          break;
        default:
          console.log('ERROR: Illegal mdoType: ' + stream.mdoType);
          break;
      }
      // console.log('Processing ' + value + ' for ' + varSlug + ': ' + result);
      return result;
    }
  }
