import { NativeModule, requireNativeModule } from "expo";

import type {
  ImagePlaygroundParams,
  ImagePlaygroundResult,
  TorchImagePlaygroundModuleEvents,
} from "./TorchImagePlayground.types";

declare class TorchImagePlaygroundModule extends NativeModule<TorchImagePlaygroundModuleEvents> {
  /**
   * Check if Image Playground is available on this device.
   * Requires iOS 18.2+ and iPhone 15 Pro or newer.
   * @returns true if Image Playground is available
   */
  isSupported(): boolean;

  /**
   * Launch Image Playground and return the generated image file path.
   * @param params - Optional parameters for source image and concepts
   * @returns File path of generated image, or null if user cancelled
   * @throws Error if Image Playground is not supported on this device
   */
  launchAsync(params?: ImagePlaygroundParams): Promise<ImagePlaygroundResult>;
}

// Fallback stub for when native module isn't available (dev builds, unsupported devices)
const FallbackModule = {
  isSupported: () => false,
  launchAsync: async () => null,
} as unknown as TorchImagePlaygroundModule;

// Try to load native module, fall back gracefully if unavailable
let module: TorchImagePlaygroundModule;
try {
  module = requireNativeModule<TorchImagePlaygroundModule>(
    "TorchImagePlayground",
  );
} catch {
  // Native module not available (not compiled, unsupported device, etc.)
  module = FallbackModule;
}

export default module;
