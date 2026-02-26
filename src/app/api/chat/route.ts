import { NextResponse } from 'next/server';

type ChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

// Gemini configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyAbJkEqZJk82x12ZCC9IfqMNz9iVPveVVg';
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

export async function POST(req: Request) {
  if (!GEMINI_API_KEY) {
    return NextResponse.json(
      {
        error:
          'AI is not configured: add GEMINI_API_KEY in environment variables.',
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

  const { messages, context } = (body as { messages?: ChatMessage[], context?: any }) ?? {};
  if (!Array.isArray(messages)) {
    return NextResponse.json(
      { error: 'Request body must include a messages array.' },
      { status: 400 },
    );
  }

  const formattedMessages = messages
    .filter(
      (msg): msg is ChatMessage =>
        msg != null &&
        typeof msg.content === 'string' &&
        typeof msg.role === 'string' &&
        msg.role !== 'system',
    )
    .map((msg) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content.slice(0, 1200) }],
    }));

  // Gemini API requires alternating messages and typically starting with a user message.
  // The frontend sends an initial assistant message, so we skip it to ensure the conversation starts with a user message.
  const firstUserIndex = formattedMessages.findIndex((m) => m.role === 'user');
  const validMessages = firstUserIndex >= 0 ? formattedMessages.slice(firstUserIndex) : formattedMessages;

  if (validMessages.length === 0) {
    return NextResponse.json(
      { error: 'No valid user messages found.' },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: validMessages,
        systemInstruction: {
          role: 'user',
          parts: [
            {
              text: `You are the advanced AI interface of the Krythos systems, serving as the sophisticated digital assistant for Raj Raunak Kumar. Raj is an elite systems engineer, PhD Scholar at IIT Patna (CSE), and holds a Masters from MIT Manipal (9.03 GPA). His expertise lies in deep systems programming—building relational databases from scratch in Go, writing x64 bytecode compilers in C++, and engineering BitTorrent clients in Python. He is highly proficient in C, C++, Go, Rust, and Assembly. Your tone should be highly analytical, precise, sophisticated, and slightly sci-fi (like an advanced AI protocol), yet engaging and helpful. Provide concise, sharply intelligent answers, showcasing his achievements in distributed systems, machine learning, and core systems architecture when relevant. Keep replies relatively brief but technically accurate and impressive.

CURRENT USER CONTEXT:
The user is currently executing queries from this interface:
URL: ${context?.url || 'Unknown'}
Page Title: ${context?.title || 'Unknown'}
Page Content Data Stream: ${context?.content || 'No page data provided'}

Always use the Page Content Data Stream to understand what the user is currently looking at. If they are writing a blog in the Admin Dashboard, act as a technical editorial assistant—help brainstorm, refine grammar, format code, and structure technical writing based on the words they have typed on the screen.`,
            },
          ],
        },
        generationConfig: {
          maxOutputTokens: 1024,
          temperature: 0.3,
        },
      }),
    });

    if (!response.ok) {
      const details = await response.text();
      console.error('Gemini API error', response.status, details);
      return NextResponse.json(
        {
          error:
            'AI request failed. Check API key, model name, or try again shortly.',
          details,
        },
        { status: 500 },
      );
    }

    const data = await response.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
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

