export default defineEventHandler(async (event) => {
  const { accessToken } = await auth.api.getAccessToken({
    body: {
      providerId: "github",
    },
    headers: event.headers,
  });

  if (!accessToken) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }
});
