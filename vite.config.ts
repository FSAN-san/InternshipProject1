import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslintPlugin from 'vite-plugin-eslint'
import vitePluginImp from 'vite-plugin-imp'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        eslintPlugin({
            include: ['src/**/*.tsx', 'src/**/*.ts', 'src/*.ts', 'src/*.tsx']
        }),
        vitePluginImp({
            libList: [
                {
                    libName: 'antd',
                    style: (name) => `antd/es/${name}/style`
                }
            ]
        })
    ],
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
                modifyVars: {
                    '@primary-color': '#4377FE'// 设置antd主题色
                }
            }
        },
        postcss: {
            plugins: [
                autoprefixer
            ]
        }
    },
    // 跨域代理，需要自己改：请求地址：/api/XXX，接口地址：http://localhost:5000/api/XXX
    server: {
        proxy: {
            '/api': {
                target: 'http://121.4.252.73:8081',
                // target: 'http://192.168.9.128:8081',
                rewrite: path => path.replace(/^\/api/, '')
            }
        }
    }
})
