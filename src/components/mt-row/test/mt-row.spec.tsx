import { newSpecPage } from '@stencil/core/testing';
import { MtRow } from '../mt-row';

describe('mt-row', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MtRow],
      html: `<mt-row></mt-row>`,
    });
    expect(page.root).toEqualHtml(`
      <mt-row>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </mt-row>
    `);
  });
});
