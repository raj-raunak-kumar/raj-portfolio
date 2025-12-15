'use server';

import axios from 'axios';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().email(),
  subject: z.string().min(2),
  message: z.string().min(10),
});

export async function submitContactForm(values: z.infer<typeof formSchema>) {
  try {
    const response = await axios.post('https://formspree.io/f/xkgdkqrr', values, {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.status === 200) {
      return { success: true, message: "Message sent successfully!" };
    } else {
      // Handle non-200 success responses if any
      return { success: false, message: `Received status ${response.status}. Please try again.` };
    }
  } catch (error: any) {
    console.error("Form submission error:", error);
    // More robust error handling for network errors or Formspree issues
    if (axios.isAxiosError(error)) {
        const serverError = error.response?.data?.error;
        if (serverError) {
            return { success: false, message: `Submission failed: ${serverError}` };
        }
        return { success: false, message: "A network error occurred. Please check your connection and try again."};
    }
    return { success: false, message: "An unexpected error occurred while sending the message." };
  }
}
