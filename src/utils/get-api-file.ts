import { readFileSync } from 'fs';
import { parse } from 'yaml';
import { resolve } from 'path';

export const getApiFile = () => {
  const pathToFile = resolve('doc', 'api.yaml');

  const file = readFileSync(pathToFile, 'utf8');

  return parse(file);
};
