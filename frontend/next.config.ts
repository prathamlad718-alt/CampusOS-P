import fs from 'fs';
import path from 'path';
import type { NextConfig } from 'next';

const pluginsPath = path.resolve(__dirname, '../plugins');
const pluginPackages: string[] = [];

try {
  const plugins = fs.readdirSync(pluginsPath);
  for (const plugin of plugins) {
    const pkgJsonPath = path.join(pluginsPath, plugin, 'package.json');
    if (fs.existsSync(pkgJsonPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
      if (pkg.name) {
        pluginPackages.push(pkg.name);
      }
    }
  }
} catch (e) {
  console.warn('Could not load plugins for transpilePackages', e);
}

const nextConfig: NextConfig = {
  transpilePackages: [
    ...pluginPackages,
    '@campusos/design-system',
    '@campus-os/shared'
  ],
  experimental: {
    externalDir: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      }
    ]
  },
  async rewrites() {
    const backendPort = process.env.BACKEND_PORT || '4000';
    return [
      {
        source: '/api/v1/:path*',
        destination: `http://localhost:${backendPort}/api/v1/:path*`
      }
    ];
  }
};

export default nextConfig;
