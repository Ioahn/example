import EventSource from 'eventsource';

export class SSE {
  transport: EventSource;

  private static _instance: SSE;
  private messageHandlers = new Set<(evt: MessageEvent) => void>();

  static init(auth_token: string) {
    if (SSE._instance) {
      return SSE._instance;
    }

    const newSSE = new SSE(auth_token);

    SSE._instance = newSSE;

    return newSSE;
  }

  constructor(auth_token: string) {
    this.transport = new EventSource(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}api/sse/stream`,
      {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      }
    );

    this.transport.onmessage = (evt) => {
      this.messageHandlers.forEach((handler) => handler(evt));
    };
  }

  onStart = (fn: (evt: MessageEvent) => void) => {
    this.transport.onopen = fn;
  };

  addMessageHandler = (fn: (evt: MessageEvent) => void) => {
    this.messageHandlers.add(fn);
  };

  onError = (fn: (evt: MessageEvent) => void) => {
    this.transport.onerror = fn;
  };
}
