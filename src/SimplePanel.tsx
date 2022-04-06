import React, { useState, useEffect } from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import ReactSpeedometer from 'react-d3-speedometer';

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data }) => {
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

  const styles = {
    dial: {
      display: 'inline-block',
      width: `300px`,
      height: `auto`,
      color: '#000',
      padding: '2px',
    },
  };
  return (
    <div>
      <div style={styles.dial}>
        <ReactSpeedometer
          value={needleValue}
          minValue={2}
          maxValue={10000}
          segments={4}
          segmentColors={['#B03A2E', '#148F77', '#B7950B', '#B03A2E']}
          customSegmentStops={[2, m2mValue, contaminationValue, openLoopValue, 10000]}
          forceRender={true}
        />
      </div>
    </div>
  );
};
