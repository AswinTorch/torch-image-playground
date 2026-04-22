/**
 * Text-based concepts for AI generation guidance.
 * Provide keywords or phrases that describe the desired image.
 */
export type TextConcept = {
  text: string[];
};

/**
 * Content-based concepts that extract meaning from longer text.
 * Apple's AI will analyze the content to understand the desired image.
 */
export type ContentConcept = {
  /** Optional title for the extracted concept */
  title?: string;
  /** Content to extract concepts from */
  content: string;
};

/**
 * Concepts for guiding AI image generation.
 * Either text-based keywords or content-based extraction.
 */
export type ImagePlaygroundConcepts = TextConcept | ContentConcept;

/**
 * Generation styles for Image Playground (maps to Apple’s `ImagePlaygroundStyle`).
 * @see https://developer.apple.com/documentation/imageplayground/imageplaygroundstyle
 */
export type ImagePlaygroundStyleName =
  | "animation"
  | "illustration"
  | "sketch"
  | "all";

/**
 * Personalization behavior for the system UI (maps to `ImagePlaygroundPersonalizationPolicy`).
 * @see https://developer.apple.com/documentation/imageplayground/imageplaygroundpersonalizationpolicy
 */
export type ImagePlaygroundPersonalizationPolicyName =
  | "automatic"
  | "enabled"
  | "disabled";

/**
 * Parameters for launching Image Playground.
 */
export type ImagePlaygroundParams = {
  /** Concepts for AI generation guidance */
  concepts?: ImagePlaygroundConcepts;
  /**
   * Optional source image: `https://` / `http://` URL (downloaded before present) or
   * absolute filesystem path (with or without `file://`).
   */
  sourceUri?: string;
  /**
   * Styles the user may choose in the playground. Must include `selectedStyle` when both are set.
   * @see https://developer.apple.com/documentation/imageplayground/imageplaygroundviewcontroller/allowedgenerationstyles
   */
  allowedStyles?: ImagePlaygroundStyleName[];
  /**
   * Pre-selected style. If `allowedStyles` is omitted, allowed list defaults to `[selectedStyle]`.
   * @see https://developer.apple.com/documentation/imageplayground/imageplaygroundviewcontroller/selectedgenerationstyle
   */
  selectedStyle?: ImagePlaygroundStyleName;
  /**
   * Personalization policy for generated images. Omit for system default.
   */
  personalizationPolicy?: ImagePlaygroundPersonalizationPolicyName;
};

/**
 * Result from Image Playground.
 * Returns the file path of the generated image, or null if cancelled.
 */
export type ImagePlaygroundResult = string | null;

/**
 * Module events (none currently defined).
 */
export type TorchImagePlaygroundModuleEvents = Record<string, never>;
