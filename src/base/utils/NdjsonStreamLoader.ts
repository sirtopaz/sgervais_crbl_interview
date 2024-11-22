/**
 * This helper fetches a stream of ndJson formatted data and returns a stream of batched Json strings
 *
 * @param url location of the data to be streamed
 *
 * @returns a Promise containing a steam
 */
const NdjsonStreamLoader = (url: string): Promise<ReadableStream<string[]>> => {
  // fetch the URL - load body as a stream - read chunk - convert into batched JSON string stream
  return fetch(url)
    .then((response) => response.body)
    .then((body) => {
      if (!body) {
        throw new Error("No response");
      }

      const reader = body.getReader();
      const decoder = new TextDecoder();

      return new ReadableStream({
        start(controller) {
          let currentChunk = "";

          const processJson = () => {
            reader.read().then(({ done, value }) => {
              if (done) {
                if (currentChunk) {
                  controller.enqueue([currentChunk]); // push the last of the json to the stream
                }

                controller.close();
                return;
              }

              const data = decoder.decode(value, { stream: true });
              currentChunk += data; // concat from end of last chunk

              const jsonList = currentChunk.split("\n");
              const lastIdx = jsonList.length - 1;

              const batch = jsonList.slice(0, lastIdx);
              controller.enqueue(batch);

              currentChunk = jsonList[lastIdx]; // handle partial JSON at end of chunk (could be full JSON too)

              //recurse for more stream
              processJson();
            });
          };

          // start reading the stream
          processJson();
        },
      });
    })
    .catch((e) => {
      throw new Error("Error Loading File: " + e);
    });
};

export default NdjsonStreamLoader;
