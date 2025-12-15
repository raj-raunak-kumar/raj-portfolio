import { NextResponse } from 'next/server';

type ChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

// Groq configuration (OpenAI-compatible API)
const GROQ_MODEL = process.env.GROQ_MODEL || 'llama-3.1-8b-instant';
const GROQ_API_URL =
  process.env.GROQ_API_URL || 'https://api.groq.com/openai/v1/chat/completions';

export async function POST(req: Request) {
  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json(
      {
        error:
          'AI is not configured: add GROQ_API_KEY (and optionally GROQ_MODEL) in environment variables.',
      },
      { status: 500 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const { messages } = (body as { messages?: ChatMessage[] }) ?? {};
  if (!Array.isArray(messages)) {
    return NextResponse.json(
      { error: 'Request body must include a messages array.' },
      { status: 400 },
    );
  }

  const sanitizedMessages: ChatMessage[] = messages
    .filter(
      (msg): msg is ChatMessage =>
        msg != null &&
        typeof msg.content === 'string' &&
        typeof msg.role === 'string',
    )
    .map((msg) => {
      const role: ChatMessage['role'] =
        msg.role === 'assistant'
          ? 'assistant'
          : msg.role === 'system'
            ? 'system'
            : 'user';
      return {
        role,
        content: msg.content.slice(0, 1200),
      };
    })
    .slice(-12);

  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          {
            role: 'system',
            content:
              'You are a concise, friendly assistant for Raj Raunak’s portfolio site. Answer clearly, stay on-topic, and keep replies brief.',
          },
          ...sanitizedMessages,
        ],
        max_tokens: 250,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const details = await response.text();
      console.error('Groq API error', response.status, details);
      return NextResponse.json(
        {
          error:
            'AI request failed. Check GROQ_API_KEY, model name, or try again shortly.',
          details,
        },
        { status: 500 },
      );
    }

    const data = await response.json();
    const reply =
      data?.choices?.[0]?.message?.content?.trim() ||
      'I could not generate a response right now.';

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chat route error', error);
    return NextResponse.json(
      { error: 'Failed to process chat request.' },
      { status: 500 },
    );
  }
}

