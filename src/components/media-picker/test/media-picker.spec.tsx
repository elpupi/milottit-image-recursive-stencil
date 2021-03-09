import { newSpecPage } from '@stencil/core/testing';
import { MtMediaPicker } from '../media-picker';

describe('media-picker', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MtMediaPicker],
      html: `<media-picker></media-picker>`,
    });
    expect(page.root).toEqualHtml(`
      <media-picker>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </media-picker>
    `);
  });
});
