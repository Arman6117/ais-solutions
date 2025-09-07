import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: "https://ais-solutions-3z4mvo7pc-arman6117s-projects.vercel.app"
})