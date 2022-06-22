import { NextResponse } from "next/server";

export default async function middleware(req) {
    const userData = await decodeToken(req);
    return handleRequest(req, userData);
}

const handleRequest = (req, userData) => {
    const url = req.url;
    if (url === "http://localhost:3000/") {
        return handleIndex(userData);
    } else if (url === "http://localhost:3000/benefits") {
        return handleBenefits(userData);
    } else if (url === `http://localhost:3000/project`) {
        return handleProject(userData);
    } else if (url === `http://localhost:3000/employees`) {
        return handleEmployees(userData);
    } else if (url === `http://localhost:3000/deductions`) {
        return handleDeductions(userData);
    } else if (url === `http://localhost:3000/hours`) {
        return handleHours(userData);
    }
    else {
        return NextResponse.next();
    }
};

const handleIndex = async (userData) => {
    if (userData) {
        return NextResponse.next();
    } else {
        return NextResponse.redirect("http://localhost:3000/unauthorized");
    }
};

const handleBenefits = async (userData) => {
    if (userData) {
        const ids = await fetchIds(userData);
        let response = NextResponse.next();
        response.headers.append("ids", JSON.stringify(ids));
        return response;
    } else {
        return NextResponse.redirect("http://localhost:3000/unauthorized");
    }
};

const handleProject = async (userData) => {
    if (userData) {
        if (userData.isEmployer) {
            const ids = await fetchIds(userData);
            let response = NextResponse.next();
            response.headers.append("ids", JSON.stringify(ids));
            return response;
        } else {
            return NextResponse.redirect(`http://localhost:3000/coming-soon`);
        }
    } else {
        return NextResponse.redirect(`http://localhost:3000/unauthorized`);
    }
};

const handleEmployees = async (userData) => {
    if (userData) {
        if (userData.isEmployer) {
            const ids = await fetchIds(userData);
            let response = NextResponse.next();
            response.headers.append("ids", JSON.stringify(ids));
            return response;
        } else {
            return NextResponse.redirect(`http://localhost:3000/coming-soon`);
        }
    } else {
        return NextResponse.redirect(`http://localhost:3000/unauthorized`);
    }
};

const handleDeductions = async (userData) => {
    if (userData) {
        const ids = await fetchIds(userData);
        let response = NextResponse.next();
        response.headers.append("ids", JSON.stringify(ids));
        return response;
    } else {
        return NextResponse.redirect("http://localhost:3000/unauthorized");
    }
};

const decodeToken = async (req) => {
    const { cookies } = req;
    const decoded = await (
        await fetch("http://localhost:3000/api/services/validateToken", {
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
            await fetch("http://localhost:3000/api/services/fetchIds", {
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
