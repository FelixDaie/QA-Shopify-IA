export default function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();
  res.json({
    tools: [
      {
        id: "get_product_by_handle",
        description: "Obtiene información de un producto según su handle",
        params: [{ name: "handle", type: "string" }]
      },
      {
        id: "get_orders_by_email",
        description: "Obtiene pedidos según correo electrónico",
        params: [{ name: "email", type: "string" }]
      }
    ]
  });
}
