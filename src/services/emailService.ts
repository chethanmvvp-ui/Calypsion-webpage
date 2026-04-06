import emailjs from '@emailjs/browser';

/**
 * Interface for EmailJS parameters.
 * Note: These should match your EmailJS Template variables.
 */
export interface EmailParams {
    name: string;
    email: string;
    from_name?: string;
    from_email?: string;
    phone?: string;
    company?: string;
    message: string;
    subject: string;
    time?: string;
    to_email?: string; 
}

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';
const TO_EMAIL = process.env.NEXT_PUBLIC_EMAILJS_TO_EMAIL || 'info@calypsion.com';

/**
 * Sends an email using EmailJS.
 */
export const sendEmail = async (params: EmailParams): Promise<{ success: boolean; error?: string }> => {
    // Diagnostic Check: Ensure keys are present
    if (!SERVICE_ID || !PUBLIC_KEY || !TEMPLATE_ID) {
        console.error('EmailJS Configuration Error: Missing environment variables.');
        return { 
            success: false, 
            error: 'System Configuration Incomplete. Please check .env file.' 
        };
    }

    try {
        const templateParams: Record<string, unknown> = {
            ...params,
            to_email: params.to_email || TO_EMAIL,
            from_email: params.email,
            from_name: params.name
        };

        const response = await emailjs.send(
            SERVICE_ID,
            TEMPLATE_ID,
            templateParams as Parameters<typeof emailjs.send>[2],
            PUBLIC_KEY
        );

        if (response.status === 200) {
            console.log('Transmission Successful:', response.text);
            return { success: true };
        } else {
            console.error('Transmission Failed:', response.text);
            return { success: false, error: 'Transmission Failed: Protocol Handshake Error' };
        }
    } catch (error: unknown) {
        console.error('EmailJS Protocol Error:', error);
        const text =
            error && typeof error === 'object' && 'text' in error && typeof (error as { text: unknown }).text === 'string'
                ? (error as { text: string }).text
                : undefined;
        return { success: false, error: text || 'Protocol Handshake Failed' };
    }
};
