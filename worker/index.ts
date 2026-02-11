interface Env {
  STATIC_ASSETS: {
    fetch: (request: Request) => Promise<Response>;
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    return env.STATIC_ASSETS.fetch(request);
  },
};
