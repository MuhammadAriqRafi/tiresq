import { NextResponse } from "next/server";

const makeCallback = async (controller: any) => {
	try {
		const { status, body } = await controller();
		return NextResponse.json({ ...body });
	} catch (error: any) {
		return NextResponse.json({ error: error.message });
	}
};

export default makeCallback;
