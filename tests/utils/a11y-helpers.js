import { AxeBuilder } from '@axe-core/playwright';

export async function expectNoAxeViolations(page, context = null) {
    const builder = new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'best-practice']);
    
    if (context) {
        builder.include(context);
    }

    const results = await builder.analyze();

    if (results.violations.length > 0) {
        console.error('Accessibility violations:', JSON.stringify(results.violations, null, 2));
        throw new Error(`${results.violations.length} accessibility violations found`);
    }
}