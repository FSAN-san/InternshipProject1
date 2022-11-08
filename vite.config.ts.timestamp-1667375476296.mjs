// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslintPlugin from "vite-plugin-eslint";
import vitePluginImp from "vite-plugin-imp";
import autoprefixer from "autoprefixer";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    eslintPlugin({
      include: ["src/**/*.tsx", "src/**/*.ts", "src/*.ts", "src/*.tsx"]
    }),
    vitePluginImp({
      libList: [
        {
          libName: "antd",
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
          "@primary-color": "#4377FE"
        }
      }
    },
    postcss: {
      plugins: [
        autoprefixer
      ]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxGU0FOXFxcXERlc2t0b3BcXFxcZl9yZWFjdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcRlNBTlxcXFxEZXNrdG9wXFxcXGZfcmVhY3RcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL0ZTQU4vRGVza3RvcC9mX3JlYWN0L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCBlc2xpbnRQbHVnaW4gZnJvbSAndml0ZS1wbHVnaW4tZXNsaW50J1xuaW1wb3J0IHZpdGVQbHVnaW5JbXAgZnJvbSAndml0ZS1wbHVnaW4taW1wJ1xuaW1wb3J0IGF1dG9wcmVmaXhlciBmcm9tICdhdXRvcHJlZml4ZXInXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICAgIHBsdWdpbnM6IFtcbiAgICAgICAgcmVhY3QoKSxcbiAgICAgICAgZXNsaW50UGx1Z2luKHtcbiAgICAgICAgICAgIGluY2x1ZGU6IFsnc3JjLyoqLyoudHN4JywgJ3NyYy8qKi8qLnRzJywgJ3NyYy8qLnRzJywgJ3NyYy8qLnRzeCddXG4gICAgICAgIH0pLFxuICAgICAgICB2aXRlUGx1Z2luSW1wKHtcbiAgICAgICAgICAgIGxpYkxpc3Q6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGxpYk5hbWU6ICdhbnRkJyxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IChuYW1lKSA9PiBgYW50ZC9lcy8ke25hbWV9L3N0eWxlYFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSlcbiAgICBdLFxuICAgIGNzczoge1xuICAgICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICAgICAgICBsZXNzOiB7XG4gICAgICAgICAgICAgICAgamF2YXNjcmlwdEVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgbW9kaWZ5VmFyczoge1xuICAgICAgICAgICAgICAgICAgICAnQHByaW1hcnktY29sb3InOiAnIzQzNzdGRScvLyBcdThCQkVcdTdGNkVhbnRkXHU0RTNCXHU5ODk4XHU4MjcyXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBwb3N0Y3NzOiB7XG4gICAgICAgICAgICBwbHVnaW5zOiBbXG4gICAgICAgICAgICAgICAgYXV0b3ByZWZpeGVyXG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gXHU4REU4XHU1N0RGXHU0RUUzXHU3NDA2XHVGRjBDXHU5NzAwXHU4OTgxXHU4MUVBXHU1REYxXHU2NTM5XHVGRjFBXHU4QkY3XHU2QzQyXHU1NzMwXHU1NzQwXHVGRjFBL2FwaS9YWFhcdUZGMENcdTYzQTVcdTUzRTNcdTU3MzBcdTU3NDBcdUZGMUFodHRwOi8vbG9jYWxob3N0OjUwMDAvYXBpL1hYWFxuICAgIC8vIHNlcnZlcjoge1xuICAgIC8vICAgICBwcm94eToge1xuICAgIC8vICAgICAgICAgJy9hcGknOiB7XG4gICAgLy8gICAgICAgICAgICAgdGFyZ2V0OiAnaHR0cDovL2xvY2FsaG9zdDo1MDAwJ1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9XG4gICAgLy8gfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBbVIsU0FBUyxvQkFBb0I7QUFDaFQsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sa0JBQWtCO0FBQ3pCLE9BQU8sbUJBQW1CO0FBQzFCLE9BQU8sa0JBQWtCO0FBR3pCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQ3hCLFNBQVM7QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLGFBQWE7QUFBQSxNQUNULFNBQVMsQ0FBQyxnQkFBZ0IsZUFBZSxZQUFZLFdBQVc7QUFBQSxJQUNwRSxDQUFDO0FBQUEsSUFDRCxjQUFjO0FBQUEsTUFDVixTQUFTO0FBQUEsUUFDTDtBQUFBLFVBQ0ksU0FBUztBQUFBLFVBQ1QsT0FBTyxDQUFDLFNBQVMsV0FBVztBQUFBLFFBQ2hDO0FBQUEsTUFDSjtBQUFBLElBQ0osQ0FBQztBQUFBLEVBQ0w7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNELHFCQUFxQjtBQUFBLE1BQ2pCLE1BQU07QUFBQSxRQUNGLG1CQUFtQjtBQUFBLFFBQ25CLFlBQVk7QUFBQSxVQUNSLGtCQUFrQjtBQUFBLFFBQ3RCO0FBQUEsTUFDSjtBQUFBLElBQ0o7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNMLFNBQVM7QUFBQSxRQUNMO0FBQUEsTUFDSjtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBU0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
