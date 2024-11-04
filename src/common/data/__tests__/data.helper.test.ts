import { type Mock, vi } from "vitest";
import { NdjsonStreamLoader } from "../data.helper";

global.fetch = vi.fn();

describe("COMMON:DATA:data.helper", () => {
  describe("NdjsonStreamLoader", () => {
    beforeEach(() => {
      (global.fetch as Mock).mockReset();
    });

    it("should load JSON data from a valid NDJSON stream", async () => {
      const mockResponse = [
        '{"name": "Mickey"}',
        '{"name": "Minnie"}',
        '{"name": "Donald"}',
      ].join("\n");

      // Mocking the fetch response
      (fetch as Mock).mockImplementationOnce(() => {
        const stream = new ReadableStream({
          start(controller) {
            const encoder = new TextEncoder();
            controller.enqueue(encoder.encode(mockResponse));
            controller.close();
          },
        });
        return Promise.resolve({
          body: stream,
        });
      });

      const result = await NdjsonStreamLoader("http://example.com/ndjson");

      const reader = result.getReader();
      const output: string[][] = [];

      // Read the stream
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        output.push(value);
      }

      expect(output).toEqual([
        ['{"name": "Mickey"}', '{"name": "Minnie"}'], // First batch
        ['{"name": "Donald"}'], // Last batch
      ]);
    });

    it("should throw an error if there is no response body", async () => {
      (fetch as Mock).mockResolvedValue(JSON.stringify({}));

      await expect(
        NdjsonStreamLoader("http://example.com/ndjson")
      ).rejects.toThrow("No response");
    });

    it("should throw an error if fetch fails", async () => {
      (fetch as Mock).mockRejectedValueOnce(new Error("Network Error"));

      await expect(
        NdjsonStreamLoader("http://example.com/ndjson")
      ).rejects.toThrow("Error Loading File: Error: Network Error");
    });
  });
});
