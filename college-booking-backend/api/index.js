// api/index.js
import app from "./app.js";  // use import, not require

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
