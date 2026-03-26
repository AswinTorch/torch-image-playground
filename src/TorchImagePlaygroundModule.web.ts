import { registerWebModule, NativeModule } from 'expo';

import { TorchImagePlaygroundModuleEvents } from './TorchImagePlayground.types';

class TorchImagePlaygroundModule extends NativeModule<TorchImagePlaygroundModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(TorchImagePlaygroundModule, 'TorchImagePlaygroundModule');
