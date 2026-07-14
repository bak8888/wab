import { NextResponse } from 'next/server';import { getAnalysis } from '@/services/analysis/service';
export async function GET(_:Request,{params}:{params:Promise<{id:string}>}){const {id}=await params;const a=getAnalysis(id);return a?NextResponse.json(a):NextResponse.json({error:'NOT_FOUND'},{status:404})}
