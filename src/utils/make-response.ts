const makeResponse = (
	message: string = "",
	data: any = {},
	status: number = 200
) => {
	return {
		status,
		body: {
			message,
			data: [data],
		},
	};
};

export default makeResponse;
