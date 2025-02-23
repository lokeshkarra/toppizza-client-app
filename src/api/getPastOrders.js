export default async function getPastOrders(page) {
  const userId = localStorage.getItem("user_id");
  const apiUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(`${apiUrl}/api/past-orders?page=${page}`, {
    method: "GET",
    headers: { "x-user-id": userId },
  });
  const data = await response.json();
  return data;
}
