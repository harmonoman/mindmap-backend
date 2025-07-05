const path = require('path');
const { extractAll } = require('../lib/extractAll');

describe('extractAll()', () => {
    const validFile = path.join(__dirname, '../sample-data/example-map.itmz');
    const missingStyleFile = path.join(__dirname, './fixtures/missing-style.itmz');
    const corruptFile = path.join(__dirname, './fixtures/corrupt.zip');
    const notAZip = path.join(__dirname, './fixtures/not-a-zip.txt');

    // Happy case
    test('returns all expected keys from valid .itmz', () => {
        const result = extractAll(validFile);

        expect(result).toHaveProperty('mapdata');
        expect(result).toHaveProperty('style');
        expect(result).toHaveProperty('manifest');
        expect(result).toHaveProperty('preferences');
        expect(result).toHaveProperty('displayState');
        expect(result).toHaveProperty('assets');

        expect(typeof result.mapdata).toBe('object');
    });

    // Missing file
    test('handles missing file (e.g., missing style.xml) gracefully', () => {
        const result = extractAll(missingStyleFile);

        expect(result.style).toBe(null); // Or {} depending on your logic
        expect(result.mapdata).not.toBeNull();
    });

    // Corrupt .itmz file
    test('throws or handles corrupt .itmz gracefully', () => {
        expect(() => extractAll(corruptFile)).toThrow();
    });

    // Non-zip file
    test('throws for non-zip files', () => {
        expect(() => extractAll(notAZip)).toThrow();
    });

    // Missing filepath
    test('throws or exits for missing filepath argument', () => {
        expect(() => extractAll()).toThrow();
    });

    // Expected type
    test('each extracted section is of expected type', () => {
        const result = extractAll(validFile);

        expect(typeof result.mapdata).toBe('object');
        expect(typeof result.style).toBe('object');
        expect(typeof result.manifest).toBe('object');
        expect(typeof result.preferences).toBe('object');
        expect(typeof result.displayState).toBe('object');
        expect(typeof (result.assets)).toBe('object');
    });

    // Count number of topics (recursive)
    function countTopics(node) {
        if (!node) return 0;
        let count = 1; // count this topic
        if (Array.isArray(node.topic)) {
            // multiple child topics
            for (const child of node.topic) {
            count += countTopics(child);
            }
        } else if (node.topic) {
            // single child topic
            count += countTopics(node.topic);
        }
        return count;
    }

    //  Test Large .itmz (Stress Test)
    test('extracts large .itmz without error', () => {
    const largeFile = path.join(__dirname, './fixtures/large-map.itmz');
    const result = extractAll(largeFile);
    expect(result).toHaveProperty('mapdata');
        
    const rootTopics = result.mapdata.iThoughts.topics.topic;
    const totalTopics = Array.isArray(rootTopics)
        ? rootTopics.reduce((sum, t) => sum + countTopics(t), 0)
        : countTopics(rootTopics);

    console.log(`🌳 Total topics in map: ${totalTopics}`);
    expect(totalTopics).toBeGreaterThan(5000);
    });
});