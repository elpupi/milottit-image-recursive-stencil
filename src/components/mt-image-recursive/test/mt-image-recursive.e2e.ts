import { newE2EPage } from '@stencil/core/testing';

describe('mt-image-recursive', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<mt-image-recursive></mt-image-recursive>');

    const element = await page.find('mt-image-recursive');
    expect(element).toHaveClass('hydrated');
  });
});
