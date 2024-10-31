import { createContext } from "react";

import { LogDataState } from "./data.types";
import { LoadingStatus } from "./data.constants";

/**
 * This helper fetches a stream of ndJson formatted data and returns a stream of individual Json strings
 *
 * @param url location of the data to be streamed
 *
 * @returns a Promise containing a steam
 */
export const NdjsonStreamLoader = (
  url: string
): Promise<ReadableStream<string>> => {
  // fetch the URL - load body as a stream - read chunk - convert into individual JSON string stream

  return fetch(url)
    .then((response) => response.body)
    .then((body) => {
      if (!body) {
        throw new Error("No response");
      }

      const reader = body.getReader();
      const decoder = new TextDecoder();

      return new ReadableStream({
        start: (controller) => {
          let currentChunk = "";

          const processJson = () => {
            reader.read().then(({ done, value }) => {
              if (done) {
                if (currentChunk) {
                  controller.enqueue(currentChunk); // push the last of the json to the stream
                }

                controller.close();
                return;
              }

              const data = decoder.decode(value, { stream: true });

              currentChunk += data; // concat from end of last chunk
              const jsonList = currentChunk.split("\n");
              const listLength = jsonList.length;

              // push all but last item (could be partial)
              for (let i = 0; i < listLength - 1; i++) {
                const json = jsonList[i].trim();

                if (json) {
                  controller.enqueue();
                }
              }

              currentChunk = jsonList[listLength - 1]; // handle partial JSON at end of chunk (could be full JSON too)

              //recurse for more stream
              processJson();
            });
          };

          processJson();
        },
      });
    })
    .catch((e) => {
      throw new Error("Error Loading File: " + e);
    });
};

const DEFAULT_LOG_DATA_STATE: LogDataState = {
  logEventCount: 0,
  logEvents: [],
  status: LoadingStatus.START,
};

export const LogDataContext = createContext<LogDataState>(
  DEFAULT_LOG_DATA_STATE
);