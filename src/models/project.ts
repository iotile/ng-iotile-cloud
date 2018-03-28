import { Org } from './org';
import { Device, DeviceDictionary } from './device';
import { Stream, StreamDictionary } from './stream';
import { Variable, VariableDictionary } from './variable';
import { Mdo } from './mdo';
import { DataPoint } from './datapoint';
import { Property, PropertyDictionary } from './property';

export class Project {
    public id: string;
    public gid: string;
    public slug: string;
    public name: string;
    public createdBy: string;
    public createdOn: Date;
    public orgSlug: string;
    public projectTemplate: string;

    public org: Org;
    public devices: Array<Device>;
    public deviceMap: DeviceDictionary;
    public streams: Array<Stream>;
    public streamMap: StreamDictionary;
    public variables: Array<Variable>;
    public variableMap: VariableDictionary;
    public properties: Array<Property>;
    public propertyMap: PropertyDictionary;
    public counts: { [index: string]: number };

    constructor(data: any = {}) {
      this.id = data.id;
      this.gid = data.gid;
      this.slug = data.slug;
      this.name = data.name;
      this.orgSlug = data.org;
      this.createdBy = data.created_by;
      this.createdOn = new Date(data.created_on);
      if ('project_template' in data) {
        this.projectTemplate = data.project_template;
      }

      if (data.counts) {
        this.counts = data.counts;
      }

      this.deviceMap = {};
      this.streamMap = {};
      this.variableMap = {};
    }

    public addDevices(devices: Array<Device>): void {
      this.devices = devices;
      this.deviceMap = {};
      this.devices.forEach(d => {
        this.deviceMap[d.slug] = d;
      });
    }

    public getDevice(slug: string): Device {
      return this.deviceMap[slug];
    }

    public addStreams(streams: Array<Stream>): void {
      this.streams = streams;
      this.streamMap = {};
      this.streams.forEach(s => {
        this.streamMap[s.slug] = s;
      });
    }

    public getStream(slug: string): Stream {
      return this.streamMap[slug];
    }

    public addVariables(variables: Array<Variable>): void {
      this.variables = variables;
      this.variableMap = {};
      this.variables.forEach(v => {
        this.variableMap[v.slug] = v;
      });
    }

    public getVariable(slug: string): Variable {
      return this.variableMap[slug];
    }

    public getVariableForStream(slug: string): Variable | undefined {
      if (slug) {
        let elements: Array<string> = slug.split('--');
        if (elements.length === 4) {
          let varSlug: string = 'v--' + elements[1] + '--' + elements[3];
          return this.getVariable(varSlug);
        }
      }
      return;
    }

    public addProperties(properties: Array<Property>): void {
      this.properties = properties;
      this.propertyMap = {};
      this.properties.forEach(property => {
        this.propertyMap[property.name] = property;
      });
    }

    public getProperty(name: string): Property {
      return this.propertyMap[name];
    }

    public computeValue(stream: Stream, data: DataPoint): number | undefined {
      let result: number | undefined = undefined;
      let mdo: Mdo;
      if (!stream) {
        return result;
      }
      if (stream.outputUnit) {
        mdo = stream.outputUnit.mdo;
        if (mdo) {
          result = mdo.computeValue(data.value);
        }
      } else {
        result = data.outValue ? data.outValue : data.value;
      }

      return result;
    }
  }
