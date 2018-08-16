'use strict';
// import moment from 'moment';

import { DataFilterArgs } from '../../src/models/datafilterargs';

describe('DataFilterArgsTest', () => {

  it('check buildFilterString() for dates', () => {
    let args: DataFilterArgs = new DataFilterArgs();
    expect(args).toBeTruthy();
    let filter_string=args.buildFilterString();
    let end = args.endDate.toISOString();
    expect(filter_string).toEqual('?end='+end);
    args.startDate = new Date("2016-09-13T20:29:13.825000Z");
    filter_string = args.buildFilterString();
    end = args.endDate.toISOString();
    expect(filter_string).toEqual("?start=2016-09-13T20:29:13.825Z&end="+end);
    args = new DataFilterArgs();
    args.endDate = new Date("2016-10-13T20:29:13.825000Z");
    filter_string = args.buildFilterString();
    expect(filter_string).toEqual("?end=2016-10-13T20:29:13.825Z");
    args.startDate = new Date("2016-09-13T20:29:13.825000Z");
    filter_string = args.buildFilterString();
    expect(filter_string).toEqual("?start=2016-09-13T20:29:13.825Z&end=2016-10-13T20:29:13.825Z");
    args.page = 2;
    expect(args.buildFilterString()).toEqual("?start=2016-09-13T20:29:13.825Z&end=2016-10-13T20:29:13.825Z&page=2");
    args.pageSize=10000;
    args.page = 0;
    expect(args.buildFilterString()).toEqual("?start=2016-09-13T20:29:13.825Z&end=2016-10-13T20:29:13.825Z&page_size=10000");
  });

  describe('check buildFilterString()', () => {
    let streamSlugMock = 's--0000-0000--0000-0000-0000--5001';

    it ('should build filter', () => {
      let args = new DataFilterArgs();
      args.filter = streamSlugMock;
      let filter_string = args.buildFilterString();
      let end = args.endDate.toISOString();
      expect(filter_string).toEqual(`?end=`+end+`&filter=${streamSlugMock}`);
    });

    it ('should build filter with extras', () => {
      let args = new DataFilterArgs();
      args.filter = streamSlugMock;
      args.extras = ['staff=1'];
      let filter_string = args.buildFilterString();
      let end = args.endDate.toISOString();
      expect(filter_string).toEqual(`?end=`+end+`&filter=${streamSlugMock}`+'&staff=1');

      args.extras = ['a=b', 'c=d'];
      filter_string = args.buildFilterString();
      end = args.endDate.toISOString();
      expect(filter_string).toEqual(`?end=`+end+`&filter=${streamSlugMock}`+'&a=b&c=d');
    });

    it('should build startStreamerId', () => {
      let args = new DataFilterArgs();
      args.filter = streamSlugMock;
      args.startIncrementalId = 2412;
      let filter_string = args.buildFilterString();
      let end = args.endDate.toISOString();
      expect(filter_string).toEqual(`?end=`+end+`&filter=${streamSlugMock}&streamer_id_0=${args.startIncrementalId}`);
    });

    it('should build endStreamerId', () => {
      let args = new DataFilterArgs();
      args.endIncrementalId = 3793;
      let filter_string = args.buildFilterString();
      let end = args.endDate.toISOString();
      expect(filter_string).toEqual(`?end=`+end+`&streamer_id_1=${args.endIncrementalId}`);
    });
  });

  it('check buildFilterLabel() or dates', () => {
    let args: DataFilterArgs = new DataFilterArgs();
    expect(args).toBeTruthy();
    expect(args.buildFilterLabel()).toEqual('');
    args.startDate = new Date("2016-09-13T20:29:13.825000Z");
    expect(args.buildFilterLabel()).toEqual(" from 2016/09/13");
    args = new DataFilterArgs();
    args.endDate = new Date("2016-10-13T20:29:13.825000Z");
    expect(args.buildFilterLabel()).toEqual(" to 2016/10/13");
    args.startDate = new Date("2016-09-13T20:29:13.825000Z");
    expect(args.buildFilterLabel()).toEqual(" from 2016/09/13 to 2016/10/13");
  });

  it('check lastN', () => {
    let args: DataFilterArgs = new DataFilterArgs();
    expect(args).toBeTruthy();
    args.lastN = 10;
    let filter_string = args.buildFilterString();
    let end = args.endDate.toISOString();
    expect(filter_string).toEqual("?end="+end+"&lastn=10");
    expect(args.buildFilterLabel()).toEqual(" to "+args.endDate.toLocaleDateString()+" last 10 entries");
  });
});
