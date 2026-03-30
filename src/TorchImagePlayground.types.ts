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
 * Parameters for launching Image Playground.
 */
export type ImagePlaygroundParams = {
  /** Concepts for AI generation guidance */
  concepts?: ImagePlaygroundConcepts;
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
