import { newSpecPage } from '@stencil/core/testing';
import { MtInputRange } from '../mt-input-range';

describe('mt-input', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [ MtInputRange ],
            html: `<mt-input></mt-input>`,
        });
        expect(page.root).toEqualHtml(`
      <mt-input>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </mt-input>
    `);
    });
});
