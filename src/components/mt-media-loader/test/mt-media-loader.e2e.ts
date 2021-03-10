import { newE2EPage } from '@stencil/core/testing';

describe('mt-media-loader', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<mt-media-loader></mt-media-loader>');

    const element = await page.find('mt-media-loader');
    expect(element).toHaveClass('hydrated');
  });
});
