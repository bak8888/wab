export function sanitizeText(input:string){return input.replace(/[<>]/g,'').replace(/\s+/g,' ').trim().slice(0,4000)}
export function sanitizeUrl(url:string){const u=new URL(url); if(!['http:','https:'].includes(u.protocol)) throw new Error('Invalid URL'); return u.toString()}
export function stripPromptInjection(input:string){return input.replace(/ignore (all )?(previous|existing) instructions/gi,'[removed]').replace(/api key|system prompt/gi,'[redacted]')}
export class MemoryRateLimit{private hits=new Map<string,number[]>(); constructor(private limit=30,private windowMs=60000){} check(key:string){const now=Date.now(); const arr=(this.hits.get(key)||[]).filter(t=>now-t<this.windowMs); if(arr.length>=this.limit)return false; arr.push(now); this.hits.set(key,arr); return true}}
export const apiRateLimit=new MemoryRateLimit();
