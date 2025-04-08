import { io } from 'socket.io-client';

const delay = async (ms: number) =>
  await new Promise((resolve) => setTimeout(() => resolve(null), ms));

export class WSS {
  transport: Maybe<ReturnType<typeof io>> = null;

  private static _instance: WSS;
  private static _isTestingNamespace: boolean = false;

  static init(auth_token: string, useTestingNamespace: boolean = false) {
    if (WSS._instance && WSS._isTestingNamespace === useTestingNamespace) {
      return WSS._instance;
    }

    const newWSS = new WSS(auth_token, useTestingNamespace);

    WSS._instance = newWSS;
    WSS._isTestingNamespace = useTestingNamespace;

    return newWSS;
  }

  constructor(auth_token: string, useTestingNamespace: boolean = false) {
    this.createInstance(auth_token, useTestingNamespace);
  }

  createInstance = (
    auth_token: string,
    useTestingNamespace: boolean = false
  ) => {
    localStorage.debug = '*';

    let namespace = '';

    if (useTestingNamespace) {
      namespace = 'testing';
    }

    this.transport = io(process.env.NEXT_PUBLIC_API_BASE_URL + namespace, {
      autoConnect: true,
      path: '/ws/socket.io',
      extraHeaders: {
        Authorization: `Bearer ${auth_token}`,
      },
    });
  };

  connect = () => {
    this.transport?.connect();
  };

  hasConnection = async () => {
    let connected = false;

    do {
      await delay(300);
      connected = !!this.transport?.connected;
    } while (!connected);

    return connected;
  };

  disconnect = () => {
    this.transport?.disconnect();
  };

  on = (event: string, listener: AnyFunction) => {
    this.transport?.on(event, listener);
  };

  emit = (event: string, ...listener: (AnyFunction | string)[]) => {
    this.transport?.emit(event, ...listener);
  };

  removeAllListener = () => {
    this.transport?.removeAllListeners();
  };
}
