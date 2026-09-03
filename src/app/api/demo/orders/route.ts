export const POST = async (request: Request) => {
  const requestBody = await request.json().catch(() => null);

  return Response.json(
    {
      accepted: true,
      fixture: "agentmart-order-endpoint",
      requestBody,
    },
    { status: 201 },
  );
};
