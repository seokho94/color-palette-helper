/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // Windows 개발 환경 최적화
  webpack: (config, { dev }) => {
    if (dev) {
      // Watchpack 설정 (Windows 시스템 파일 무시)
      config.watchOptions = {
        ...config.watchOptions,
        ignored: [
          '**/node_modules/**',
          '**/.git/**',
          '**/.next/**',
          // Windows 시스템 파일 무시
          '**/hiberfil.sys',
          '**/swapfile.sys',
          '**/pagefile.sys',
          '**/DumpStack.log.tmp',
        ],
      }

      // 파일 시스템 캐시 최적화
      config.cache = {
        ...config.cache,
        type: 'filesystem',
        buildDependencies: {
          config: [__filename],
        },
      }
    }

    return config
  },

  // 실험적 기능 (안정성 향상)
  experimental: {
    // 증분 캐시 비활성화 (Windows 파일 잠금 문제 방지)
    isrMemoryCacheSize: 0,
  },
}

module.exports = nextConfig
