import { NextRequest } from "next/server";
import { getUsers } from "@services/user-service";
import makeCallback from "@utils/make-callback";

export async function POST(req: NextRequest) {
	return makeCallback(async () => {
		const httpRequest = await req.json();
		return getUsers(httpRequest);
	});
}
