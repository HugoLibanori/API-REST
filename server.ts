import app from "./app";

const port = process.env.APP_PORT;

app.listen(port, () => console.log(`Escutando na porta: ${port}`));
