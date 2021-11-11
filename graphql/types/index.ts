import { DateTimeResolver } from 'graphql-scalars';
import { asNexusMethod } from 'nexus';

export const DateTime = asNexusMethod(DateTimeResolver, 'DateTime');

export * from './Post';
