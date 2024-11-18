import { FastifyRequest } from 'fastify';
import { CacheStrategyResult } from './cache-strategy-result.interface';

export interface CacheStrategy {
  execute(request: FastifyRequest): Partial<CacheStrategyResult>;
}
