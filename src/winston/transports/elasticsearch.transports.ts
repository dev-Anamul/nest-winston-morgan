/* eslint-disable prettier/prettier */
import { ElasticsearchTransformer, ElasticsearchTransport } from 'winston-elasticsearch';

export const elasticTransports = new ElasticsearchTransport({
  level: 'info',
  transformer: (logData) => {
    const transformed = ElasticsearchTransformer(logData);
    return transformed;
  },
  clientOpts: { node: 'http://localhost:9200' },
});
