import { expect, it } from 'vitest';
import { notionURL, safeNotionURL } from './notion';
it('accepts existing private links and published embed codes without injecting HTML', () => {
  expect(notionURL(' https://www.notion.so/Cardiologia-123 ')).toBe('https://www.notion.so/Cardiologia-123');
  expect(notionURL('<iframe src="https://example.notion.site/ebd/123?x=1&amp;y=2" onload="alert(1)"></iframe>')).toBe('https://example.notion.site/ebd/123?x=1&y=2');
});
it('rejects script URLs, user-info tricks and domains impersonating Notion', () => {
  for (const url of ['javascript:alert(1)', 'https://notion.so.evil.com/a', 'https://notion.so@evil.com/a', 'http://notion.so/a', '<iframe src="data:text/html,bad"></iframe>']) {
    expect(() => notionURL(url)).toThrow(); expect(safeNotionURL(url)).toBe('');
  }
  expect(notionURL('')).toBe('');
});
