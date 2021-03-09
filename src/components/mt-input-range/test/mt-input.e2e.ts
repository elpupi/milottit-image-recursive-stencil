import { newE2EPage } from '@stencil/core/testing';

describe('mt-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<mt-input></mt-input>');

    const element = await page.find('mt-input');
    expect(element).toHaveClass('hydrated');
  });
});
