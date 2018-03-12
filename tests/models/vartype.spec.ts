'use strict';

import { VarType, VarTypeDictionary } from '../../src/models/vartype';
import { Variable } from '../../src/models/variable';
import { Unit } from '../../src/models/unit';
import { Mdo } from '../../src/models/mdo';

const dummyVarType: VarType = new VarType({
    "name": "Liquid Volume",
    "slug": "liquid-volume",
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
    "storage_units_full": "Liters"
});

const dummyVarTypeWithSchema: VarType = new VarType({
    "name": "POD-1M Accelerometer",
    "slug": "pod-1m-accelerometer",
    "available_input_units": [],
    "available_output_units": [],
    "stream_data_type": "E2",
    "decoder": null,
    "schema": {
        "id": 1,
        "keys": {
            "duration": {
                "type": "float",
                "label": "Duration",
                "units": "ms",
                "decimal": 3
            },
            "delta_v_x": {
                "type": "float",
                "output_units": {
                    "in/s": {
                        "mdo": [
                            3937,
                            100,
                            0.0
                        ]
                    }
                },
                "label": "dV(X)",
                "units": "m/s",
                "decimal": 3
            },
            "delta_v_y": {
                "type": "float",
                "output_units": {
                    "in/s": {
                        "mdo": [
                            3937,
                            100,
                            0.0
                        ]
                    }
                },
                "label": "dV(Y)",
                "units": "m/s",
                "decimal": 3
            },
            "delta_v_z": {
                "type": "float",
                "output_units": {
                    "in/s": {
                        "mdo": [
                            3937,
                            100,
                            0.0
                        ]
                    }
                },
                "label": "dV(Z)",
                "units": "m/s",
                "decimal": 3
            },
            "peak": {
                "type": "float",
                "label": "Peak",
                "units": "G",
                "decimal": 2
            },
            "axis": {
                "type": "str",
                "label": "Axis"
            }
        },
        "display_order": []
    },
    "storage_units_full": "Event",
    "storage_units_short": ""
});

describe('VarTypeTest', () => {

  it('check basic varType', () => {
    let varType: VarType = dummyVarType;
    expect(varType.name).toEqual('Liquid Volume');
    expect(varType.slug).toEqual('liquid-volume');
    expect(varType.unitFullName).toEqual('Liters');
  });

  it('check available input in varType', () => {
    let varType: VarType = dummyVarType;
    expect(varType.availableInputUnits.length).toEqual(2);
    expect(varType.availableInputUnits[0].fullName).toEqual('Gallons');
    expect(varType.availableInputUnits[1].fullName).toEqual('Liters');
  });

  it('check available output in varType', () => {
    let varType: VarType = dummyVarType;
    expect(varType.availableOutputUnits.length).toEqual(2);
    expect(varType.availableOutputUnits[0].fullName).toEqual('Foo');
    expect(varType.availableOutputUnits[1].fullName).toEqual('Bar');
  });

  it('check varTypeDictionary', () => {
    let varType1: VarType = dummyVarType;
    let varType2: VarType = new VarType({
        "name": "Liquid Flow",
        "slug": "liquid-flow",
        "storage_units_full": "LPM",
        "storage_units_short": "lpm"
    });

    expect(varType2.name).toEqual('Liquid Flow');
    let varTypeDict: VarTypeDictionary = {}
    varTypeDict[varType1.slug] = varType1;
    varTypeDict[varType2.slug] = varType2;

    expect(varTypeDict[varType1.slug].name).toEqual('Liquid Volume');
    expect(varTypeDict[varType2.slug].name).toEqual('Liquid Flow');
  });

  it('check getInputUnitForSlug', () => {
    let varType: VarType = dummyVarType;
    let u1: Unit | undefined = varType.getInputUnitForSlug('in--water-meter-volume--liters');
    if (u1) {
      expect(u1.fullName).toEqual('Liters');
      expect(u1.shortName).toEqual('l');
    }
  });

  it('check getOutputUnitForSlug', () => {
    let varType: VarType = dummyVarType;
    let u1: Unit | undefined = varType.getOutputUnitForSlug('out--water-meter-volume--foo');
    if (u1) {
      expect(u1.fullName).toEqual('Foo');
      expect(u1.shortName).toEqual('g');
    }
  });

  it('check basic varType with schema', () => {
    expect(dummyVarTypeWithSchema.schema.schemaKeys.length).toBe(6);
  });

  it('check basic varType schema with units', () => {
    let secondSchemaWithOutputUnits = dummyVarTypeWithSchema.schema.schemaKeys[1];
    expect(secondSchemaWithOutputUnits.units).toBe('m/s');
  });

  it('check basic varType schema with outputUnits', () => {
    let secondSchemaWithOutputUnits = dummyVarTypeWithSchema.schema.schemaKeys[1];
    expect(secondSchemaWithOutputUnits.outputUnits).toBeDefined();
    expect(secondSchemaWithOutputUnits.outputUnits['in/s']['mdo'][0]).toEqual(3937);
    expect(secondSchemaWithOutputUnits.outputUnits['in/s']['mdo'][1]).toEqual(100);
  });

  it('check basic varType schema without outputUnits', () => {
    let secondSchemaWithOutputUnits = dummyVarTypeWithSchema.schema.schemaKeys[0];
    expect(secondSchemaWithOutputUnits.outputUnits).not.toBeDefined();
  });
});
