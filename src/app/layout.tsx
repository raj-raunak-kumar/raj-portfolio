import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/components/auth-provider";

export const metadata: Metadata = {
  title: 'Raj Raunak - The Evolving Hero',
  description: 'The Evolving Hero Portfolio',
};

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600', '700'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${outfit.variable}`}>
      <head>
        {/* Font Awesome is now handled by lucide-react or inline SVGs, so this link is no longer needed. */}
      </head>
      <body className={`${outfit.className} bg-black min-h-screen text-white antialiased overflow-x-hidden relative font-body`}>
        <AuthProvider>
          <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/20 via-black to-black opacity-50 z-[-1]" />
          <div className="relative z-10 w-full">
            {children}
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
