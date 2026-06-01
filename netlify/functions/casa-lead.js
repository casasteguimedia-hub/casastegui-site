exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ ok: false, error: "Method not allowed" }),
    };
  }

  try {
    const webhookUrl = process.env.CASA_STEGUI_LEAD_WEBHOOK_URL;

    if (!webhookUrl) {
      return {
        statusCode: 500,
        body: JSON.stringify({ ok: false, error: "Lead webhook is not configured" }),
      };
    }

    const payload = JSON.parse(event.body || "{}");

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const text = await response.text();

    return {
      statusCode: 200,
      body: JSON.stringify({
        ok: response.ok,
        result: text,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, error: String(error) }),
    };
  }
};
