export const ICE_SERVERS = {
  iceServers: [
    // {
    //   urls: `stun:${process.env.NEXT_PUBLIC_COTURN_IP1}:3478`,
    // },
    // {
    //   urls: `stun:${process.env.NEXT_PUBLIC_COTURN_IP2}:3478`,
    // },
    // {
    //   urls: `turn:${process.env.NEXT_PUBLIC_COTURN_IP1}:3478`,
    //   username: 'user',
    //   credential: 'user',
    // },
    // {
    //   urls: `turn:${process.env.NEXT_PUBLIC_COTURN_IP2}:3478`,
    //   username: 'user',
    //   credential: 'user',
    // },
    {
      urls: `turn:${process.env.NEXT_PUBLIC_FLASHPHONER_COTURN}:3478`,
      credential: 'coM77EMrV7Cwhyan',
      username: 'flashphoner',
    },
  ],
  // iceCandidatePoolSize: 10,
  // iceTransportPolicy: 'all' as RTCIceTransportPolicy,
  // bundlePolicy: 'max-bundle' as RTCBundlePolicy,
  // rtcpMuxPolicy: 'require' as RTCRtcpMuxPolicy,
};
