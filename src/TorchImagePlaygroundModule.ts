import { NativeModule, requireNativeModule } from 'expo';

import { TorchImagePlaygroundModuleEvents } from './TorchImagePlayground.types';

declare class TorchImagePlaygroundModule extends NativeModule<TorchImagePlaygroundModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<TorchImagePlaygroundModule>('TorchImagePlayground');
