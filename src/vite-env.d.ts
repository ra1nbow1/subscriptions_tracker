/// <reference types="vite/client" />
interface ImportMetaEnv {
	readonly VITE_WITH_TELEGRAM: string
	readonly VITE_BACKEND_URL: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
