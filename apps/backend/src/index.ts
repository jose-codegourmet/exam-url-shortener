import { server } from "./server";

const port = Number(process.env.PORT ?? 3000);
const host = "0.0.0.0";

server.listen(port, host, () => {
	console.log(
		`[server]: Listening on http://${host}:${port} (PORT env=${process.env.PORT ?? "(unset)"})`,
	);
});
