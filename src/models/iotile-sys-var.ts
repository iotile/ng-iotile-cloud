export class IOTileSysVar {
  public eventStream: string = '5020';

  public battery: string = '5800';

  public gatewayScanBegin: string = '5a00';
  public gatewayScanEnd: string = '5a01';
  public gatewayScanFailure: string = '5a03';
  public endOfTripSummary: string = '5a07';

  public rebootStream: string = '5c00';

  public tripStarted: string = '5E00';
  public tripEnded: string = '5E01';
  public tripPauseResumse: string = '5E02';
}
