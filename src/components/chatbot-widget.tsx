"use client";

import { useEffect, useRef, useState } from 'react';
import { Terminal, Loader2, SquareTerminal, Send, User, Cpu } from 'lucide-react';

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
    "SYSTEM ONLINE. I am the Krythos AI Protocol, the primary interface for Raj Raunak Kumar. How may I assist your inquiry?",
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
    scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, open]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isSending) return;

    const nextMessages: Message[] = [...messages, { role: 'user', content: text }];
    setMessages(nextMessages);
    setInput('');
    setIsSending(true);
    setError(null);

    try {
      const pageContext = {
        url: window.location.href,
        title: document.title,
        // Send a 3000 character excerpt of the current screen text so the AI knows what the user sees
        content: document.body.innerText.substring(0, 3000)
      };

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages, context: pageContext }),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const data = (await response.json()) as { reply?: string; error?: string };
      const reply = data.reply || data.error || 'ERROR: SYSTEM COMM FAILURE.';
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      console.error(err);
      setError('CONNECTION SEVERED. Retrying uplink...');
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
        <button
          className="fixed bottom-24 right-4 md:bottom-6 md:right-6 z-50 flex items-center justify-center rounded-full bg-black/80 backdrop-blur border border-primary/50 text-white p-3 md:px-6 md:py-3 shadow-[0_0_20px_rgba(57,255,20,0.4)] hover:shadow-[0_0_40px_rgba(57,255,20,0.8)] hover:border-primary transition-all duration-300 group overflow-hidden"
        >
          <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10 flex items-center gap-0 md:gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-primary blur-md opacity-50 animate-pulse"></div>
              <SquareTerminal className="h-6 w-6 md:h-5 md:w-5 text-primary relative z-10" />
            </div>
            <span className="hidden md:inline font-mono text-sm tracking-widest font-bold text-primary">KRYTHOS AI</span>
          </div>
        </button>
      </DialogTrigger>

      <DialogContent className="bg-black/80 backdrop-blur-xl text-gray-200 sm:max-w-xl border-2 border-primary/30 shadow-[0_0_50px_rgba(57,255,20,0.15)] rounded-xl overflow-hidden p-0 font-sans">
        {/* Futuristic Header Pattern */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>

        <div className="px-6 py-4">
          <DialogHeader className="mb-4 text-left">
            <DialogTitle className="flex items-center gap-3 text-2xl font-headline tracking-wider text-white">
              <div className="p-2 bg-primary/10 rounded border border-primary/30 animate-pulse shadow-[0_0_10px_rgba(57,255,20,0.3)]">
                <Cpu className="h-6 w-6 text-primary" />
              </div>
              KRYTHOS_AI_LINK
            </DialogTitle>
            <DialogDescription className="text-gray-500 font-mono text-xs uppercase tracking-widest flex flex-col gap-1 mt-2">
              <span>// Protocol: Raj Raunak Kumar Assistant</span>
              <span>// Awaiting secure user input...</span>
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <ScrollArea className="h-80 rounded-lg border border-white/5 bg-black/60 p-4 shadow-inner relative overflow-hidden">
              {/* Background Grid */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-20"></div>

              <div className="flex flex-col gap-4 relative z-10">
                {messages.map((msg, idx) => (
                  <div
                    key={`${msg.role}-${idx}`}
                    className={cn(
                      'flex items-start gap-3 w-full',
                      msg.role === 'user' ? 'justify-end' : 'justify-start',
                    )}
                  >
                    {msg.role === 'assistant' && (
                      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded bg-primary/10 border border-primary/30 text-primary shadow-[0_0_10px_rgba(57,255,20,0.2)]">
                        <Terminal className="h-4 w-4" />
                      </div>
                    )}
                    <div
                      className={cn(
                        'px-4 py-3 text-sm leading-relaxed max-w-[85%]',
                        msg.role === 'user'
                          ? 'bg-white/10 text-white border border-white/20 rounded-tl-xl rounded-tr-xl rounded-bl-xl rounded-br-sm backdrop-blur-sm'
                          : 'bg-primary/5 text-primary border-l-2 border-primary/50 font-mono rounded-r-lg shadow-[inset_10px_0_20px_rgba(57,255,20,0.05)]',
                      )}
                      style={{ textShadow: msg.role === 'assistant' ? '0 0 5px rgba(57,255,20,0.3)' : 'none' }}
                    >
                      {msg.content}
                    </div>
                    {msg.role === 'user' && (
                      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded bg-white/10 border border-white/20 text-white">
                        <User className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                ))}
                {isSending && (
                  <div className="flex items-center gap-3 text-xs font-mono text-primary animate-pulse ml-11">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    [PROCESSING DATA ARRAYS...]
                  </div>
                )}
                {error && (
                  <div className="text-xs font-mono text-red-500 bg-red-500/10 border-l-2 border-red-500 px-4 py-3 ml-11">
                    {error}
                  </div>
                )}
                <div ref={scrollRef} className="h-4" />
              </div>
            </ScrollArea>

            <div className="flex flex-col gap-2 mt-2">
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/20 rounded-lg blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="ENTER QUERY EXECUTION STRING..."
                  className="relative z-10 bg-black/80 backdrop-blur border-white/10 text-primary placeholder:text-gray-700 font-mono focus-visible:ring-primary focus-visible:border-primary/50 rounded-lg resize-none shadow-inner"
                  rows={2}
                />
              </div>

              <div className="flex items-center justify-between gap-2 mt-1">
                <span className="text-[10px] font-mono text-gray-600 tracking-widest uppercase">
                  SECURE AI LINK // KRYTHOS V2.0
                </span>
                <Button
                  size="sm"
                  onClick={() => void sendMessage()}
                  disabled={isSending || !input.trim()}
                  className="inline-flex items-center gap-2 bg-primary text-black hover:bg-primary/80 hover:shadow-[0_0_15px_rgba(57,255,20,0.5)] font-bold tracking-widest font-mono text-xs rounded transition-all duration-300 disabled:opacity-50 disabled:shadow-none"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      EXEC
                    </>
                  ) : (
                    <>
                      <Send className="h-3 w-3" />
                      EXECUTE
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

