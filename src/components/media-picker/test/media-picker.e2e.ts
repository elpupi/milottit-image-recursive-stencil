import { newE2EPage } from '@stencil/core/testing';

describe('media-picker', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<media-picker></media-picker>');

    const element = await page.find('media-picker');
    expect(element).toHaveClass('hydrated');
  });
});
