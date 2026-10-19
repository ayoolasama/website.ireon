/** Opt in to React Router v7 behaviour now, so upgrading later is a no-op. Shared by the app and tests. */
export const routerFuture = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
} as const;
