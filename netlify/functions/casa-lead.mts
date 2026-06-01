export default async (req: Request) => {
  if (req.method !== "POST") {
    return Response.json({ ok: false, error: "Method not allowed" }, { status: 405 });
  }

  try {
    const webhookUrl = Netlify.env.get("CASA_STEGUI_LEAD_WEBHOOK_URL");

    if (!webhookUrl) {
      return Response.json(
        { ok: false, error: "Lead webhook is not configured" },
        { status: 500 }
      );
    }

    const payload = await req.json();

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const text = await response.text();

    return Response.json({
      ok: response.ok,
      result: text,
    });
  } catch (error) {
    return Response.json(
      { ok: false, error: String(error) },
      { status: 500 }
    );
  }
};

export const config = {
  path: "/api/casa-lead",
};
