import {z} from 'zod';
export const caseSchema=z.object({province:z.string().min(2).max(80),fullName:z.string().min(3).max(150),document:z.string().min(5).max(32),email:z.email(),notes:z.string().max(2000).default('')});
export const appointmentSchema=z.object({caseId:z.number().int().positive(),office:z.string().min(2).max(180),startsAt:z.iso.datetime({offset:true}),reference:z.string().min(3).max(120)});
