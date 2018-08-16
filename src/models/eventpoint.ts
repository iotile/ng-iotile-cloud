import { Page } from './page';

export interface BasicDictionary {
  [index: string]: any;
}

export class EventPage extends Page {
  public data: Array<EventPoint>;

  constructor(url: string, thisPage: number, pageCount: number) {
    super(url, thisPage, pageCount);
    this.data = [];
  }
}

export class EventPoint {
    public id: number;
    public stream: string;
    public timestamp: Date;
    public incrementalId: number;
    public dirtyTimestamp: boolean;
    public summaryData: BasicDictionary;
    public ext: string;
    public hasRawData: boolean;

    constructor(data: any = {}) {
      this.id = data.id;
      this.timestamp = new Date(data.timestamp);
      this.ext = data.ext;
      if ('stream' in data) {
        // Only getData returns a stream slug
        this.stream = data.stream;
      }
      if ('streamer_local_id' in data) {
        this.incrementalId = data.streamer_local_id;
      }
      if ('dirty_ts' in data) {
        this.dirtyTimestamp = data.dirty_ts;
      }
      if ('extra_data' in data) {
        this.summaryData = data.extra_data;
      }
      if ('has_raw_data' in data) {
        this.hasRawData = data.has_raw_data;
      }
    }
  }
