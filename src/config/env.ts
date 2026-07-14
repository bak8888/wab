import { z } from 'zod';
const Env=z.object({OPENAI_API_KEY:z.string().optional(),OPENAI_MODEL:z.string().default('gpt-4.1-mini'),DATABASE_URL:z.string().default('postgresql://postgres:postgres@localhost:5432/wab'),SPORTS_DATA_PROVIDER:z.string().default('demo'),SPORTS_DATA_API_KEY:z.string().optional(),DEFAULT_TIMEZONE:z.string().default('Asia/Seoul'),DEMO_MODE:z.coerce.boolean().default(true),ANALYSIS_CACHE_TTL_SECONDS:z.coerce.number().default(3600)});
export const env=Env.parse(process.env);
export const isDemoMode=()=>env.DEMO_MODE || !env.OPENAI_API_KEY;
