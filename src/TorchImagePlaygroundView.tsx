import { requireNativeView } from 'expo';
import * as React from 'react';

import { TorchImagePlaygroundViewProps } from './TorchImagePlayground.types';

const NativeView: React.ComponentType<TorchImagePlaygroundViewProps> =
  requireNativeView('TorchImagePlayground');

export default function TorchImagePlaygroundView(props: TorchImagePlaygroundViewProps) {
  return <NativeView {...props} />;
}
