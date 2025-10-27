export default class AnswerModel {
  id: string;
  text: string;
  // Weights for each possible result. The keys should match Result ids
  weights: Record<string, number>;
  // Optional image URL for illustrated answers
  imageUrl?: string;

  constructor(attrs: {
    id: string;
    text: string;
    weights: Record<string, number>;
    imageUrl: string;
  }) {
    this.id = attrs.id;
    this.text = attrs.text;
    this.weights = attrs.weights;
    this.imageUrl = attrs.imageUrl;
  }
}
