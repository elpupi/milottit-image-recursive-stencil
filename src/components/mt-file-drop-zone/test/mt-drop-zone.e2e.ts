import { newE2EPage } from '@stencil/core/testing';

describe('mt-file-drop-zone', () => {
    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent('<mt-file-drop-zone></mt-file-drop-zone>');

        const element = await page.find('mt-file-drop-zone');
        expect(element).toHaveClass('hydrated');
    });
});
