"use client";

import { useEffect, useRef, useState } from 'react';
import { Bot, Loader2, MessageCircle, Send, User } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

type Message = { role: 'user' | 'assistant'; content: string };

const initialMessage: Message = {
  role: 'assistant',
  content:
    "Hi! I'm the site assistant. Ask me about Raj, his projects, or anything on this page.",
};

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isSending) return;

    const nextMessages = [...messages, { role: 'user', content: text }];
    setMessages(nextMessages);
    setInput('');
    setIsSending(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const data = (await response.json()) as { reply?: string; error?: string };
      const reply = data.reply || data.error || 'Something went wrong.';
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      console.error(err);
      setError('Unable to reach the AI right now. Try again in a moment.');
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      void sendMessage();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="fixed bottom-6 right-6 z-50 rounded-full px-5 shadow-[0_0_25px_rgba(57,255,20,0.25)] bg-primary text-black hover:bg-primary/80"
        >
          <MessageCircle className="h-4 w-4" />
          Ask AI
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#0a0a0a] text-gray-200 sm:max-w-xl border border-white/10 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <Bot className="h-5 w-5 text-primary" />
            Raj’s AI Copilot
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Ask about projects, experience, or the site. Shift+Enter for a new
            line, Enter to send.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <ScrollArea className="h-72 rounded-lg border border-white/10 bg-black/40 p-3">
            <div ref={scrollRef} className="flex flex-col gap-3 pr-2">
              {messages.map((msg, idx) => (
                <div
                  key={`${msg.role}-${idx}`}
                  className={cn(
                    'flex items-start gap-2',
                    msg.role === 'user' ? 'justify-end text-right' : 'justify-start',
                  )}
                >
                  {msg.role === 'assistant' && (
                    <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}
                  <div
                    className={cn(
                      'max-w-[80%] rounded-lg px-3 py-2 text-sm leading-relaxed shadow-sm',
                      msg.role === 'user'
                        ? 'bg-primary text-black ml-auto'
                        : 'bg-white/5 text-gray-100 border border-white/5',
                    )}
                  >
                    {msg.content}
                  </div>
                  {msg.role === 'user' && (
                    <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}
              {isSending && (
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Thinking...
                </div>
              )}
              {error && (
                <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/30 rounded-md px-3 py-2">
                  {error}
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="flex flex-col gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your question..."
              className="bg-black/40 border-white/10 text-gray-100 placeholder:text-gray-500 focus-visible:ring-primary"
              rows={3}
            />
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] text-gray-500">
                Powered by OpenAI. Keep it concise for best answers.
              </span>
              <Button
                size="sm"
                onClick={() => void sendMessage()}
                disabled={isSending || !input.trim()}
                className="inline-flex items-center gap-2"
              >
                {isSending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

