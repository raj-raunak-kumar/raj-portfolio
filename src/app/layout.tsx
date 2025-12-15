import type {Metadata} from 'next';
import { Orbitron, Rajdhani } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'Raj Raunak - The Evolving Hero',
  description: 'The Evolving Hero Portfolio',
};

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  weight: ['400', '500', '700', '900'],
});

const rajdhani = Rajdhani({
  subsets: ['latin'],
  variable: '--font-rajdhani',
  weight: ['300', '500', '600', '700'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${orbitron.variable} ${rajdhani.variable}`}>
      <head>
        {/* Font Awesome is now handled by lucide-react or inline SVGs, so this link is no longer needed. */}
      </head>
      <body className="font-body antialiased selection:bg-primary selection:text-black">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
