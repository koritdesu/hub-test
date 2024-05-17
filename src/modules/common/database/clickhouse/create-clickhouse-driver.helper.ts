import { randomUUID } from 'node:crypto';
import { createUrl } from '../../url';
import { DriverException } from '../driver.exception';
import { Driver } from '../driver.interface';

interface CreateClickhouseDriverParams {
  host: string;
  port: number;
  username: string;
  password: string;
}

export function createClickhouseDriver(
  params: CreateClickhouseDriverParams,
): Driver {
  const isDbException = (text: string) => text.includes('DB::Exception');
  const isJsonResponse = (response: Response) =>
    response.headers.get('content-type').startsWith('application/json');

  return {
    async query<T = unknown>(query: string): Promise<T> {
      const queryId = randomUUID();
      const url = createUrl(
        params.host,
        params.port,
        new URLSearchParams([
          ['session_timeout', '60'],
          ['output_format_json_quote_64bit_integers', '0'],
          ['enable_http_compression', '0'],
          ['query_id', queryId],
          ['query', query],
          ['user', params.username],
          ['password', params.password],
        ]),
      );

      const response = await fetch(url, {
        headers: {
          'Content-Type': 'text/plain',
        },
      });

      if (response.ok) {
        if (isJsonResponse(response)) {
          const json = await response.json();
          return json.data;
        }

        throw new DriverException('Only json');
      }

      const text = await response.text();
      if (isDbException(text)) {
        throw new DriverException(text);
      }

      throw new DriverException('Unknown');
    },
  };
}
