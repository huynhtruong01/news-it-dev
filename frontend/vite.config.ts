import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig(() => {
    const aliases = {
        '@': path.resolve(__dirname, './src/'),
        '@components': `${path.resolve(__dirname, './src/components/')}`,
        '@components/formFields': `${path.resolve(
            __dirname,
            './src/components/FormFields/'
        )}`,
        '@components/forms': `${path.resolve(__dirname, './src/components/Forms/')}`,
        '@components/common': `${path.resolve(__dirname, './src/components/Common/')}`,
        '@api': path.resolve(__dirname, './src/api/'),
        '@models': path.resolve(__dirname, './src/models/'),
        '@data': path.resolve(__dirname, './src/data/'),
        '@hooks': path.resolve(__dirname, './src/hooks/'),
        '@utils': path.resolve(__dirname, './src/utils/'),
        '@pages': path.resolve(__dirname, './src/pages/'),
        '@layouts': path.resolve(__dirname, './src/layouts/'),
        '@features': path.resolve(__dirname, './src/features'),
    }

    return {
        plugins: [react()],
        server: {
            port: 3001,
        },
        resolve: {
            alias: aliases,
        },
    }
})
