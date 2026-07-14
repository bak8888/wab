import { NextResponse } from 'next/server';import { createAnalysis } from '@/services/analysis/service';
export async function POST(_:Request,{params}:{params:Promise<{id:string}>}){const {id}=await params;const matchId=id.replace(/^ana-/,'').replace(/-[a-f0-9]{8}$/,'');return NextResponse.json(await createAnalysis(matchId,true))}
