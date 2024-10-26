import { TokenSchema } from '../token'
import { BoxSchema } from './box'

export const ConeSchema = BoxSchema.extend({
  taper: TokenSchema,
})
