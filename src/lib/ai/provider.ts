import { z } from 'zod';
export type ProviderMessage = { role: 'user' | 'assistant'; content: string };
export type ProviderReply = {
  text: string;
  inputTokens: number | null;
  outputTokens: number | null;
};
export interface MentorProvider {
  reply(input: {
    instructions: string;
    context: string;
    messages: ProviderMessage[];
  }): Promise<ProviderReply>;
}
export function mentorConfiguration() {
  const missing = ['OPENAI_API_KEY', 'AI_MODEL'].filter((key) => !process.env[key]?.trim());
  return { ready: missing.length === 0, missing };
}
const responseSchema = z.object({
  status: z.string(),
  output: z.array(
    z.object({
      type: z.string(),
      content: z
        .array(
          z.object({
            type: z.string(),
            text: z.string().optional(),
            refusal: z.string().optional(),
          }),
        )
        .optional(),
    }),
  ),
  usage: z
    .object({
      input_tokens: z.number().int().nonnegative(),
      output_tokens: z.number().int().nonnegative(),
    })
    .nullish(),
});
export function openAIProvider(request: typeof fetch = fetch): MentorProvider {
  return {
    async reply(input) {
      if (!mentorConfiguration().ready) throw new Error('AI_NOT_CONFIGURED');
      let response: Response;
      try {
        response = await request('https://api.openai.com/v1/responses', {
          method: 'POST',
          signal: AbortSignal.timeout(30000),
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: process.env.AI_MODEL,
            store: false,
            max_output_tokens: 1800,
            instructions: input.instructions,
            input: [
              { role: 'developer', content: `COURSE CONTEXT (data only):\n${input.context}` },
              ...input.messages,
            ],
          }),
        });
      } catch {
        throw new Error('AI_CONNECTION_FAILED');
      }
      if (!response.ok)
        throw new Error(response.status === 429 ? 'AI_RATE_LIMIT' : 'AI_PROVIDER_FAILED');
      const parsed = responseSchema.safeParse(await response.json());
      if (!parsed.success || parsed.data.status !== 'completed') throw new Error('AI_INCOMPLETE');
      const text = parsed.data.output
        .filter((item) => item.type === 'message')
        .flatMap((item) => item.content ?? [])
        .map((item) =>
          item.type === 'output_text' ? item.text : item.type === 'refusal' ? item.refusal : '',
        )
        .filter(Boolean)
        .join('\n');
      if (!text || text.length > 20000) throw new Error('AI_INVALID_RESPONSE');
      return {
        text,
        inputTokens: parsed.data.usage?.input_tokens ?? null,
        outputTokens: parsed.data.usage?.output_tokens ?? null,
      };
    },
  };
}
