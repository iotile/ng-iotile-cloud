export class EventPage {
  public pageSize: number;
  public totalCount: number;
  public page: number;
  public data: Array<EventPoint>;

  constructor(pageSize: number, count:number, thisPage: number) {
    this.pageSize = pageSize;
    this.totalCount = count;
    this.page = thisPage;
  }

  public pageCount (): number {
    return this.totalCount / this.pageSize;
  }
}

export class EventPoint {
    public id: number;
    public stream: string;
    public timestamp: Date;
    public incrementalId: number;
    public dirtyTimestamp: boolean;
    public ext: string;

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
    }
  }