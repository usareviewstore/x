import fs from 'fs';
import path from 'path';
import { SERVICES } from '../src/data/services';
import { BLOG_POSTS } from '../src/data/blogPosts';
import { MAIN_ROUTES_SEO } from '../src/lib/seoData';

const DIST_DIR = path.resolve(process.cwd(), 'dist');
const PUBLIC_DIR = path.resolve(process.cwd(), 'public');

function ensureDirSync(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

async function runPostBuild() {
  console.log('🚀 Running Post-Build Static Route Generator...');

  if (!fs.existsSync(DIST_DIR)) {
    console.error('❌ dist directory does not exist! Run vite build first.');
    process.exit(1);
  }

  const baseIndexHtmlPath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(baseIndexHtmlPath)) {
    console.error('❌ dist/index.html not found!');
    process.exit(1);
  }

  const baseIndexHtml = fs.readFileSync(baseIndexHtmlPath, 'utf-8');

  // 1. Ensure .nojekyll exists
  fs.writeFileSync(path.join(DIST_DIR, '.nojekyll'), '');
  console.log('✓ Created .nojekyll');

  // 2. Ensure CNAME exists
  const cnameSource = path.join(PUBLIC_DIR, 'CNAME');
  if (fs.existsSync(cnameSource)) {
    fs.copyFileSync(cnameSource, path.join(DIST_DIR, 'CNAME'));
  } else {
    fs.writeFileSync(path.join(DIST_DIR, 'CNAME'), 'usareviewstore.com');
  }
  console.log('✓ Created CNAME (usareviewstore.com)');

  // 3. Ensure _redirects exists for Cloudflare Pages / Netlify
  fs.writeFileSync(path.join(DIST_DIR, '_redirects'), '/*    /index.html   200\n');
  console.log('✓ Created _redirects');

  // 4. Ensure 404.html exists
  const source404 = path.join(PUBLIC_DIR, '404.html');
  if (fs.existsSync(source404)) {
    fs.copyFileSync(source404, path.join(DIST_DIR, '404.html'));
  } else {
    // Fallback 404 with SPA redirect
    const fallback404 = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>USA Review Store</title>
    <script type="text/javascript">
      var pathSegmentsToKeep = 0;
      var l = window.location;
      if (l.hostname.indexOf('github.io') !== -1) {
        pathSegmentsToKeep = 1;
      }
      var segmentPath = l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/');
      var redirectPath = l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~');
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        segmentPath + '/?' + (redirectPath ? '/' + redirectPath : '') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body></body>
</html>`;
    fs.writeFileSync(path.join(DIST_DIR, '404.html'), fallback404);
  }
  console.log('✓ Created 404.html');

  // 5. Gather all routes to pre-render static HTML entry points
  const routes: { route: string; title?: string; description?: string; keywords?: string; canonicalUrl?: string }[] = [];

  // Main SEO Routes
  Object.entries(MAIN_ROUTES_SEO).forEach(([routePath, seo]) => {
    if (routePath !== '/') {
      routes.push({
        route: routePath,
        title: seo.title,
        description: seo.description,
        keywords: seo.keywords,
        canonicalUrl: seo.canonicalUrl,
      });
    }
  });

  // Services Routes
  SERVICES.forEach((service) => {
    const title = `${service.name} | USA Review Store (#1 Verified Reviews)`;
    const description = `${service.description} 100% non-drop guaranteed with flexible 7, 15, or 30-day warranty replacement options.`;
    const canonical = `https://usareviewstore.com/services/${service.slug}`;

    routes.push({
      route: `/services/${service.slug}`,
      title,
      description,
      canonicalUrl: canonical,
    });

    routes.push({
      route: `/service/${service.slug}`,
      title,
      description,
      canonicalUrl: canonical,
    });
  });

  // Blog Posts Routes
  BLOG_POSTS.forEach((post) => {
    routes.push({
      route: `/blog/${post.slug}`,
      title: `${post.title} | USA Review Store Insights`,
      description: post.excerpt,
      canonicalUrl: `https://usareviewstore.com/blog/${post.slug}`,
    });
  });

  // Additional static utility routes
  const additionalRoutes = [
    '/checkout',
    '/payment',
    '/payment/success',
    '/payment/pending',
    '/payment/failed',
    '/track-order',
  ];

  additionalRoutes.forEach((route) => {
    if (!routes.some((r) => r.route === route)) {
      routes.push({ route });
    }
  });

  console.log(`📦 Pre-rendering ${routes.length} static route entry points for zero-delay deep linking...`);

  let count = 0;
  routes.forEach(({ route, title, description, keywords, canonicalUrl }) => {
    const cleanRoute = route.startsWith('/') ? route : `/${route}`;
    const targetDir = path.join(DIST_DIR, cleanRoute);
    ensureDirSync(targetDir);

    let customizedHtml = baseIndexHtml;

    if (title) {
      customizedHtml = customizedHtml.replace(/<title>.*?<\/title>/gi, `<title>${title}</title>`);
      customizedHtml = customizedHtml.replace(/<meta property="og:title" content=".*?" \/>/gi, `<meta property="og:title" content="${title}" />`);
      customizedHtml = customizedHtml.replace(/<meta name="twitter:title" content=".*?" \/>/gi, `<meta name="twitter:title" content="${title}" />`);
    }

    if (description) {
      customizedHtml = customizedHtml.replace(/<meta name="description" content=".*?" \/>/gi, `<meta name="description" content="${description}" />`);
      customizedHtml = customizedHtml.replace(/<meta property="og:description" content=".*?" \/>/gi, `<meta property="og:description" content="${description}" />`);
      customizedHtml = customizedHtml.replace(/<meta name="twitter:description" content=".*?" \/>/gi, `<meta name="twitter:description" content="${description}" />`);
    }

    if (keywords) {
      customizedHtml = customizedHtml.replace(/<meta name="keywords" content=".*?" \/>/gi, `<meta name="keywords" content="${keywords}" />`);
    }

    if (canonicalUrl) {
      customizedHtml = customizedHtml.replace(/<link rel="canonical" href=".*?" \/>/gi, `<link rel="canonical" href="${canonicalUrl}" />`);
      customizedHtml = customizedHtml.replace(/<meta property="og:url" content=".*?" \/>/gi, `<meta property="og:url" content="${canonicalUrl}" />`);
    }

    fs.writeFileSync(path.join(targetDir, 'index.html'), customizedHtml);
    count++;
  });

  console.log(`✅ Successfully created ${count} static route HTML files in dist!`);
}

runPostBuild();
