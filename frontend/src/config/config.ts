export const getConfig = (): Configuration => ({
    app: {
        url: import.meta.env.VITE_APP_URL || ""
    },
    api: {
        url: import.meta.env.VITE_API_URL || ""
    },
    environment: import.meta.env.VITE_ENV || "development"
});

type Configuration = {
    app: {
        url: string
    },
    api: {
        url: string
    },
    environment?: string
}