import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { tool_id, params } = req.body || {};
  const SHOP = process.env.SHOP;
  const SHOP_TOKEN = process.env.SHOP_TOKEN;

  try {
    if (tool_id === "get_product_by_handle") {
      const handle = params.handle;
      const query = `{
        productByHandle(handle: "${handle}") {
          id title handle descriptionHtml variants(first:1){ edges{ node{ sku inventoryQuantity } } }
        }
      }`;

      const r = await fetch(`https://${SHOP}/admin/api/2025-07/graphql.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": SHOP_TOKEN
        },
        body: JSON.stringify({ query })
      });

      const data = await r.json();
      return res.json({ ok: true, result: data });
    }

    if (tool_id === "get_orders_by_email") {
      const email = params.email;
      const r = await fetch(
        `https://${SHOP}/admin/api/2025-07/orders.json?email=${encodeURIComponent(email)}`,
        { headers: { "X-Shopify-Access-Token": SHOP_TOKEN } }
      );
      const data = await r.json();
      return res.json({ ok: true, result: data });
    }

    res.status(400).json({ ok: false, error: "tool_not_found" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
}
