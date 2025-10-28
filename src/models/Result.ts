export interface ResultModel {
  id: string;
  title: string;
  description: string;
  // Optional image URL for the result
  imageUrl?: string;
  // Optional additional metadata (like personality traits, characteristics)
  metadata?: Record<string, unknown>;
}
