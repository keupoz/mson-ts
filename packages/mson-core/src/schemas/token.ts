import { z } from 'zod'

export type Token = z.infer<typeof TokenSchema>
export const TokenSchema = z.number().or(z.string())
