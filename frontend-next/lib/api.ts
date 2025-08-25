// Ensure API_BASE always has the correct protocol
export function getApiBase() {
    const envUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

    // If the URL already has a protocol, use it as is
    if (envUrl.startsWith('http://') || envUrl.startsWith('https://')) {
        return envUrl
    }

    // If no protocol is provided, assume HTTPS for production
    if (process.env.NODE_ENV === 'production') {
        return `https://${envUrl}`
    }

    // For development, use HTTP
    return `http://${envUrl}`
}

export const API_BASE = getApiBase()
