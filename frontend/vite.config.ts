import react from '@vitejs/plugin-react'
import * as path from 'path'
import { defineConfig, UserConfigFn } from 'vite'

export interface IUserConfigFn extends UserConfigFn {
    optimizeDeps: {
        enabled: boolean
    }
}

const config = defineConfig(() => {
    const aliases = {
        '@': path.resolve(__dirname, './src/'),
    }

    return {
        plugins: [react()],
        server: {
            port: 3001,
        },
        resolve: {
            alias: aliases,
        },
        cache: true,
    }
})

export default config
