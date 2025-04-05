import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url().min(1),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().min(1),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_SECRET_KEY: z.string().min(1),
  NEXT_PUBLIC_MAP_ID: z.string().min(1),
  NEXT_PUBLIC_HCAPTCHA_SITEKEY: z.string().min(1),
  MAXIMUM_DISTANCE_IN_METER: z.coerce.number(),
  ESCORT_EXPIRY_PERIOD_IN_MILLISECONDS: z.coerce.number(),
})

const env = envSchema.parse(process.env)

export default env

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}
