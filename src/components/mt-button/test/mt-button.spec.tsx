import { newSpecPage } from '@stencil/core/testing';
import { MtButton } from '../mt-button';

describe('mt-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MtButton],
      html: `<mt-button></mt-button>`,
    });
    expect(page.root).toEqualHtml(`
      <mt-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </mt-button>
    `);
  });
});
