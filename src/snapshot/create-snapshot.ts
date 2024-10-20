import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import generateTypes from '@basketry/typescript';
import generateValidators from '@basketry/typescript-validators';
import { httpClientGenerator } from '../http-client-generator';

const pkg = require('../../package.json');
const withVersion = `${pkg.name}@${pkg.version}`;
const withoutVersion = `${pkg.name}@{{version}}`;

const service = require('basketry/lib/example-ir.json');

const snapshotFiles = [
  ...generateTypes(service),
  // ...generateValidators(service),
  ...httpClientGenerator(service, {
    typescriptHttpClient: { includeAuthSchemes: true },
  }),
];

for (const file of snapshotFiles) {
  const path = file.path.slice(0, file.path.length - 1);
  const filename = file.path[file.path.length - 1];

  const fullpath = [process.cwd(), 'src', 'snapshot', ...path];

  mkdirSync(join(...fullpath), { recursive: true });
  writeFileSync(
    join(...fullpath, filename),
    file.contents.replace(withVersion, withoutVersion),
  );
}
