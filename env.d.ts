/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: 'http://localhost:7071';
  // agrega aquí otras variables que tengas en tu .env
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}