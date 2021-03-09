import { newE2EPage } from '@stencil/core/testing';

describe('mt-row', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<mt-row></mt-row>');

    const element = await page.find('mt-row');
    expect(element).toHaveClass('hydrated');
  });
});
