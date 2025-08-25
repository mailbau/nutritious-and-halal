const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000'

// Remove trailing slash if present
const cleanBase = API_BASE.replace(/\/$/, '')

// Debug logging
console.log('API Configuration:', {
    VITE_API_URL: import.meta.env.VITE_API_URL,
    API_BASE,
    cleanBase
})

export const API_URL = (endpoint: string) => {
    // Remove leading slash from endpoint
    const cleanEndpoint = endpoint.replace(/^\//, '')

    // Always construct the URL properly
    return `${cleanBase}/api/${cleanEndpoint}`
}
