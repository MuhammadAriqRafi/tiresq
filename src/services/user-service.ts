import makeResponse from "@utils/make-response";

export function getUsers(httpRequest: any) {
	const { username } = httpRequest;
	return makeResponse("User List", username);
}
