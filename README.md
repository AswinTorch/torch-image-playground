# torch-image-playground

[![npm version](https://img.shields.io/npm/v/torch-image-playground)](https://www.npmjs.com/package/torch-image-playground)
[![npm downloads](https://img.shields.io/npm/dm/torch-image-playground)](https://www.npmjs.com/package/torch-image-playground)

Apple [Image Playground](https://developer.apple.com/documentation/imageplayground) for Expo on **iOS** — launch the system Image Playground UI and receive a **local file path** to the generated image (or `null` if the user cancels).

## Platform support

**iOS only (18.2+).** This package ships native code that weak-links Apple’s **ImagePlayground** framework. There is no Android or web implementation.

The CocoaPods spec sets **iOS 18.2** as the minimum deployment target so consumers align with APIs that are only meaningful on that OS and newer. At runtime, **`isSupported()`** reflects `ImagePlaygroundViewController.isAvailable` (hardware and OS); unsupported devices get `false` without crashing.

The JavaScript layer uses a **try/catch fallback**: if the native module is missing (e.g. non-iOS or not linked), the default export behaves as `isSupported() === false` and `launchAsync()` resolves to `null`. You can still guard with `Platform.OS === "ios"` for clarity or tree-shaking.

**Not supported in Expo Go** — use a **development build** ([`npx expo run:ios`](https://docs.expo.dev/develop/tools/#expo-run-commands), Xcode, or [EAS Build](https://docs.expo.dev/build/introduction/)).

## Install

Add the package with Expo’s installer so versions match your SDK:

```bash
npx expo install torch-image-playground
```

Then create or refresh your native project and run on a **physical device** with iOS **18.2+** where Image Playground is available (see Apple’s documentation for supported hardware). Typical flow: `npx expo prebuild` if you use [CNG](https://docs.expo.dev/workflow/prebuild/), then `npx expo run:ios`. Pod install is normally part of the iOS build; run `npx pod-install` from the app root if you open Xcode directly or need to refresh pods.

For **bare React Native**, use `npm install torch-image-playground`, ensure [`expo` is installed](https://docs.expo.dev/bare/installing-expo-modules/), then `npx pod-install` from the app root.

## Usage

Full typings: [`src/TorchImagePlayground.types.ts`](src/TorchImagePlayground.types.ts) (`ImagePlaygroundParams`, `ImagePlaygroundConcepts`, etc.).

```ts
import TorchImagePlayground from "torch-image-playground";

if (!TorchImagePlayground.isSupported()) {
  // OS/hardware does not support Image Playground
  return;
}

try {
  const path = await TorchImagePlayground.launchAsync({
    concepts: { text: ["sunset", "mountains"] },
  });
  if (path) {
    // `path` is a filesystem path string (not a file:// URL)
  }
} catch (e) {
  // Thrown when native reports unsupported or presentation fails
}
```

**Concepts:** pass either `{ text: string[] }` for keyword-style hints or `{ content: string; title?: string }` for extraction-based guidance (see types).

## Example app

From the package repo:

```bash
cd example
npm install
npx expo prebuild --clean --platform ios
npx expo run:ios
```

Use a **device** running **iOS 18.2+** with Image Playground support to exercise the full flow.

## License

MIT — see [LICENSE](./LICENSE).
