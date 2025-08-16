const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000'

// Remove trailing slash if present
const cleanBase = API_BASE.replace(/\/$/, '')

// Check if the base URL already includes /api
const hasApiPath = cleanBase.includes('/api')

// Debug logging
console.log('API Configuration:', {
    VITE_API_URL: import.meta.env.VITE_API_URL,
    API_BASE,
    cleanBase,
    hasApiPath
})

export const API_URL = (endpoint: string) => {
    // Remove leading slash from endpoint
    const cleanEndpoint = endpoint.replace(/^\//, '')

    if (hasApiPath) {
        // If base URL already has /api, don't add it again
        return `${cleanBase}/${cleanEndpoint}`
    } else {
        // If base URL doesn't have /api, add it
        return `${cleanBase}/api/${cleanEndpoint}`
    }
}
