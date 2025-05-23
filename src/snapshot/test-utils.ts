import { httpClientGenerator } from '../http-client-generator';
import generateTypes from '@basketry/typescript';
import generateDtos from '@basketry/typescript-dtos';
import generateSchemas from '@basketry/zod';
import generateValidators from '@basketry/typescript-validators';
import { NamespacedTypescriptHttpClientOptions } from '../types';

const pkg = require('../../package.json');
const withVersion = `${pkg.name}@${pkg.version}`;
const withoutVersion = `${pkg.name}@{{version}}`;

export const replaceVersion = async (
  content: string | Promise<string>,
): Promise<string> => (await content).replace(withVersion, withoutVersion);

const deepClone = (obj: any) => JSON.parse(JSON.stringify(obj));

export const generate = (options: NamespacedTypescriptHttpClientOptions) => {
  const service =
    options?.httpClient?.validation === 'zod'
      ? require('./zod-ir.json')
      : require('./native-ir.json');

  return [
    ...generateTypes(deepClone(service), options),
    ...generateDtos(deepClone(service), options),
    ...(options?.httpClient?.validation === 'zod'
      ? generateSchemas(deepClone(service), options)
      : generateValidators(deepClone(service), options)),
    ...httpClientGenerator(deepClone(service), options),
  ];
};

export const snapshots: Record<string, NamespacedTypescriptHttpClientOptions> =
  {
    native: {
      dtos: { role: 'client' },
      httpClient: { includeAuthSchemes: false },
    },
    zod: {
      dtos: { role: 'client' },
      httpClient: {
        validation: 'zod',
        includeAuthSchemes: false,
      },
    },
  };
