/// <reference types="vite/client" />
interface ImportMetaEnv {
	readonly VITE_WITH_TELEGRAM: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
