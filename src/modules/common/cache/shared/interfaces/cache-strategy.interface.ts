import { FastifyRequest } from 'fastify';

export interface CacheStrategy {
  execute(request: FastifyRequest): unknown;
}
