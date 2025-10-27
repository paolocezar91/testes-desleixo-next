export default class ResultModel {
  id: string;
  title: string;
  description: string;
  // Threshold score needed to get this result
  threshold: number;
  // Optional image URL for the result
  imageUrl?: string;
  // Optional additional metadata (like personality traits, characteristics)
  metadata?: Record<string, unknown>;

  constructor(attrs: {
    id: string;
    title: string;
    description: string;
    threshold: number;
    imageUrl?: string;
    metadata?: Record<string, unknown>;
  }) {
    this.id = attrs.id;
    this.title = attrs.title;
    this.description = attrs.description;
    this.threshold = attrs.threshold;
    this.imageUrl = attrs.imageUrl;
    this.metadata = attrs.metadata;
  }
}
