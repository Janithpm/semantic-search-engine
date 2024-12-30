import { env, pipeline, FeatureExtractionPipeline } from '@xenova/transformers';
import path from 'path';

env.localModelPath = path.join(process.cwd(), 'models');

env.allowRemoteModels = false;
console.log('Local model path:', env.localModelPath);


let embeddingPipeline: FeatureExtractionPipeline | null = null;

export async function vectorize(input: string): Promise<number[]> {
    if (!embeddingPipeline) {
        try {
            embeddingPipeline = await pipeline('feature-extraction', 'Xenova/bge-small-en-v1.5') as FeatureExtractionPipeline;
        } catch (error) {
            console.error('Error initializing pipeline:', error);
            throw new Error('Failed to initialize embedding pipeline');
        }
    }

    if (embeddingPipeline) {
        try {
            const result = await embeddingPipeline(input, { pooling: 'mean', normalize: true });
            return Array.from(result.data);
        } catch (error) {
            console.error('Error generating embedding:', error);
            throw new Error('Failed to generate embedding');
        }
    } else {
        throw new Error('Embedding pipeline is not initialized');
    }
}
