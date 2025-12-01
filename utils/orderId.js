
const generateOrderNumber = () => {
  const now = new Date();
  const pad = (num) => String(num).padStart(2, "0");
  return `${String(now.getFullYear()).slice(-2)}${pad(now.getMonth() + 1)}${pad(
    now.getDate()
  )}${pad(now.getHours())}${pad(now.getMinutes())}`;
}

module.exports = generateOrderNumber