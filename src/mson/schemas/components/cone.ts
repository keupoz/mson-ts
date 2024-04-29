import { TokenSchema } from '../utils/token';
import { BoxSchema } from './box';

export const ConeSchema = BoxSchema.extend({
  taper: TokenSchema,
});
