import { z } from 'zod';
export const learningFlowSchema = z.strictObject({
  title: z.string().min(3).max(120),
  steps: z.array(z.strictObject({label:z.string().min(2).max(60),detail:z.string().min(10).max(1000),example:z.string().min(3).max(700)})).min(2).max(7),
  conclusion: z.string().min(10).max(700),
});
export type LearningFlowData = z.infer<typeof learningFlowSchema>;
export function parseLearningFlow(text:string) {
  if(text.length>20000)throw new Error('Learning diagram is too large');
  return learningFlowSchema.parse(JSON.parse(text));
}
