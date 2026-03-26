import * as React from 'react';

import { TorchImagePlaygroundViewProps } from './TorchImagePlayground.types';

export default function TorchImagePlaygroundView(props: TorchImagePlaygroundViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
