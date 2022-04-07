import React, { useState, useEffect } from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import ReactSpeedometer from 'react-d3-speedometer';
import { METER_VALUES } from 'config/constant';

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const [needleValue, setNeedleValue] = useState(0);
  const [m2mValue, setM2mValue] = useState(1000);
  const [contaminationValue, setContaminationValue] = useState(2000);
  const [openLoopValue, setOpenLoopValue] = useState(4000);

  useEffect(() => {
    const needle = data && data.series && data.series[0].fields[1].values.get(0);
    const m2m = data && data.series && data.series[0].fields[2].values.get(0);
    const contamination = data && data.series && data.series[0].fields[3].values.get(0);
    const openLoop = data && data.series && data.series[0].fields[4].values.get(0);
    setNeedleValue(needle);
    setM2mValue(m2m);
    setContaminationValue(contamination);
    setOpenLoopValue(openLoop);
  }, [data]);

  const isNegativeNeedleValue = () => {
    if (needleValue > METER_VALUES.idle) {
      return needleValue;
    } else {
      return METER_VALUES.min;
    }
  };

  return (
    <div>
      <ReactSpeedometer
        value={needleValue > METER_VALUES.max ? METER_VALUES.max : isNegativeNeedleValue()}
        minValue={METER_VALUES.min}
        maxValue={METER_VALUES.max}
        segments={METER_VALUES.segments}
        segmentColors={METER_VALUES.segementColors}
        customSegmentStops={[METER_VALUES.min, m2mValue, contaminationValue, openLoopValue, METER_VALUES.max]}
        forceRender={true}
        currentValueText={needleValue > METER_VALUES.idle ? `${needleValue} Ω` : '-'}
        needleColor={METER_VALUES.needleColor}
        needleHeightRatio={METER_VALUES.needleHeight}
        width={width}
        height={height}
        textColor={METER_VALUES.labelColor}
      />
    </div>
  );
};
