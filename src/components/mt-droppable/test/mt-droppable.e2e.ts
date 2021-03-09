import { newE2EPage } from '@stencil/core/testing';

describe('mt-droppable', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<mt-droppable></mt-droppable>');

    const element = await page.find('mt-droppable');
    expect(element).toHaveClass('hydrated');
  });
});
