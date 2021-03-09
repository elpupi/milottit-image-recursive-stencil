import { newE2EPage } from '@stencil/core/testing';

describe('mt-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<mt-button></mt-button>');

    const element = await page.find('mt-button');
    expect(element).toHaveClass('hydrated');
  });
});
