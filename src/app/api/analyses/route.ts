import { NextRequest, NextResponse } from 'next/server';import { z } from 'zod';import { createAnalysis, recentAnalyses } from '@/services/analysis/service';
export async function GET(){return NextResponse.json({items:recentAnalyses()})}
export async function POST(req:NextRequest){try{const {matchId}=z.object({matchId:z.string().max(120)}).parse(await req.json());return NextResponse.json(await createAnalysis(matchId))}catch(e){return NextResponse.json({error:e instanceof Error?e.message:'ANALYSIS_FAILED'}, {status:400})}}
