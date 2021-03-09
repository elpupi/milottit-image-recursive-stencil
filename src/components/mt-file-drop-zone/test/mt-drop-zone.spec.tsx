import { newSpecPage } from '@stencil/core/testing';
import { MtFileDropZone } from '../mt-file-drop-zone';

describe('mt-file-drop-zone', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [ MtFileDropZone ],
            html: `<mt-file-drop-zone></mt-file-drop-zone>`,
        });
        expect(page.root).toEqualHtml(`
      <mt-file-drop-zone>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </mt-file-drop-zone>
    `);
    });
});
