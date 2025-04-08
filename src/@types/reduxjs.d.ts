import '@reduxjs/toolkit';

declare module '@reduxjs/toolkit' {
  interface SerializedError {
    status?: import('axios').HttpStatusCode;
    detail?: string;
  }
}
