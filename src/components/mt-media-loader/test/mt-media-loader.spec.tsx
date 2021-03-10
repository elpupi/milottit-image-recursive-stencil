import { newSpecPage } from '@stencil/core/testing';
import { MtMediaLoader } from '../mt-media-loader';

describe('mt-media-loader', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MtMediaLoader],
      html: `<mt-media-loader></mt-media-loader>`,
    });
    expect(page.root).toEqualHtml(`
      <mt-media-loader>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </mt-media-loader>
    `);
  });
});
