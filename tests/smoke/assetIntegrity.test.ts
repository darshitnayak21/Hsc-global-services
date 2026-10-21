import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Smoke & Asset Integrity Tests: Static Files & HTML Shell', () => {
  const publicDir = path.resolve(process.cwd(), 'public');

  it('intro video files exist and are non-empty', () => {
    const videoPath = path.join(publicDir, 'videos', 'intro-video.mp4');
    const posterPath = path.join(publicDir, 'videos', 'intro-video-poster.jpg');

    expect(fs.existsSync(videoPath), 'intro-video.mp4 should exist').toBe(true);
    expect(fs.statSync(videoPath).size).toBeGreaterThan(10000);

    expect(fs.existsSync(posterPath), 'intro-video-poster.jpg should exist').toBe(true);
    expect(fs.statSync(posterPath).size).toBeGreaterThan(1000);
  });

  it('all client logo image assets exist and have positive file sizes', () => {
    const clientLogos = [
      'anudys-bg.webp.png',
      'appzon-bg.webp.png',
      'creative-conferences-bg.webp.png',
      'creative-solution-tech-bg.webp.png',
      'lt-bg.webp.png',
      'servicenow-bg.webp.png',
      'stage-innovations-bg.webp.png',
      'triochi-bg.webp.png',
      'vanmayi-bg.webp.png',
    ];

    for (const logo of clientLogos) {
      const filePath = path.join(publicDir, 'images', 'clients', logo);
      expect(fs.existsSync(filePath), `Client logo ${logo} must exist at ${filePath}`).toBe(true);
      expect(fs.statSync(filePath).size, `Client logo ${logo} must have non-zero size`).toBeGreaterThan(100);
    }
  });

  it('index.html contains valid viewport, title, and root mount container', () => {
    const indexPath = path.resolve(process.cwd(), 'index.html');
    expect(fs.existsSync(indexPath)).toBe(true);

    const htmlContent = fs.readFileSync(indexPath, 'utf-8');
    expect(htmlContent).toContain('<div id="root"></div>');
    expect(htmlContent).toContain('<meta name="viewport"');
    expect(htmlContent).toContain('<title>');
  });
});
