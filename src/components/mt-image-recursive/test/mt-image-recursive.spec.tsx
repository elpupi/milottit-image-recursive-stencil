import { newSpecPage } from '@stencil/core/testing';
import { MtImageRecursive } from '../mt-image-recursive';

describe('mt-image-recursive', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MtImageRecursive],
      html: `<mt-image-recursive></mt-image-recursive>`,
    });
    expect(page.root).toEqualHtml(`
      <mt-image-recursive>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </mt-image-recursive>
    `);
  });
});
