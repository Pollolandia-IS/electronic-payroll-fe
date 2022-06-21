import { NextResponse } from "next/server";

export default async function middleware(req) {
    const userData = await decodeToken(req);
    const ids = await fetchIds(userData);
    return handleRequest(req, userData, ids);
}

const handleRequest = (req, userData, ids) => {
    const url = req.url;
    if (url === `${process.env.URL}/`) {
        return handleIndex(userData, ids);
    }
};

const handleIndex = (userData, ids) => {
    if (userData) {
        let response = NextResponse.next();
        response.headers.append("ids", JSON.stringify(ids));
        return response;
    } else {
        return NextResponse.redirect(`${process.env.URL}/unauthorized`);
    }
};

const decodeToken = async (req) => {
    const { cookies } = req;
    const decoded = await (
        await fetch(`${process.env.URL}/api/services/validateToken`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token: cookies.token,
            },
        })
    ).json();
    if (decoded) {
        return decoded.userData;
    }
    return null;
};

const fetchIds = async (userData) => {
    if (userData) {
        const ids = await (
            await fetch(`${process.env.URL}/api/services/fetchIds`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    email: userData.email,
                },
            })
        ).json();
        return ids;
    }
    return null;
};
