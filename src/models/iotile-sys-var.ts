export class IOTileSysVar {
  public battery: string = '5800';

  public gatewayScanBegin: string = '5a00';
  public gatewayScanEnd: string = '5a01';
  public gatewayScanFailure: string = '5a03';
  public endOfTripSummary: string = '5a07';
  public middleOfTripSummary: string = '5a08';

  public reboot: string = '5c00';

  public tripStarted: string = '5e00';
  public tripEnded: string = '5e01';
  public tripRecording: string = '5e02';
}
