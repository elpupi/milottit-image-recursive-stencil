import { newSpecPage } from '@stencil/core/testing';
import { MtDroppable } from '../mt-droppable';

describe('mt-droppable', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MtDroppable],
      html: `<mt-droppable></mt-droppable>`,
    });
    expect(page.root).toEqualHtml(`
      <mt-droppable>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </mt-droppable>
    `);
  });
});
