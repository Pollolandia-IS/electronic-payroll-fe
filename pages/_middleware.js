import { NextResponse } from "next/server";

const BASEURL = "http://localhost:3000";
export default async function middleware(req) {
    const userData = await decodeToken(req);
    return handleRequest(req, userData);
}

const handleRequest = (req, userData) => {
    const url = req.url;
    if (url === `${BASEURL}/`) {
        return handleIndex(userData);
    } else if (url === `${BASEURL}/benefits`) {
        return handleBenefits(userData);
    } else if (url === `${BASEURL}/project`) {
        return handleProject(userData);
    } else if (url === `${BASEURL}/employees`) {
        return handleEmployees(userData);
    } else if (url === `${BASEURL}/deductions`) {
        return handleDeductions(userData);
    } else if (url === `${BASEURL}/hours`) {
        return handleHours(userData);
    } else if (url === `${BASEURL}/RegisterCompany`) {
        return handleRegisterCompany(userData);
    } else if (url === `${BASEURL}/payroll`) {
        return handlePayroll(userData);
    } else if (url.match(/http:\/\/localhost:3000\/([0-9]+)\/verify/g)) {
        let userID = url.match(/\/([0-9]+)/g)[0].substring(1);
        try {
            fetch(`${BASEURL}/api/verify`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userID,
                }),
            });
        } catch (error) {
            console.log("Error:", error);
        }
        let response = NextResponse.redirect(`${BASEURL}/LogIn`);
        response.headers.append("verified", JSON.stringify(true));
        return response;
    } else {
        return NextResponse.next();
    }
};

const handleIndex = async (userData) => {
    if (userData) {
        if (userData.isEmployer) {
            const id = await fetchIds(userData, false);
            let response = NextResponse.next();
            response.headers.append("id", JSON.stringify(id));
            return response;
        } else {
            return NextResponse.next();
        }
    } else {
        return NextResponse.redirect(`${BASEURL}/unauthorized`);
    }
};

const handleBenefits = async (userData) => {
    if (userData) {
        const ids = await fetchIds(userData, true);
        let response = NextResponse.next();
        response.headers.append("ids", JSON.stringify(ids));
        return response;
    } else {
        return NextResponse.redirect(`${BASEURL}/unauthorized`);
    }
};

const handleProject = async (userData) => {
    if (userData) {
        if (userData.isEmployer) {
            const ids = await fetchIds(userData, true);
            let response = NextResponse.next();
            response.headers.append("ids", JSON.stringify(ids));
            return response;
        } else {
            return NextResponse.redirect(`${BASEURL}/coming-soon`);
        }
    } else {
        return NextResponse.redirect(`${BASEURL}/unauthorized`);
    }
};

const handleEmployees = async (userData) => {
    if (userData) {
        if (userData.isEmployer) {
            const ids = await fetchIds(userData, true);
            let response = NextResponse.next();
            response.headers.append("ids", JSON.stringify(ids));
            return response;
        } else {
            return NextResponse.redirect(`${BASEURL}/coming-soon`);
        }
    } else {
        return NextResponse.redirect(`${BASEURL}/unauthorized`);
    }
};

const handleDeductions = async (userData) => {
    if (userData) {
        const ids = await fetchIds(userData, true);
        let response = NextResponse.next();
        response.headers.append("ids", JSON.stringify(ids));
        return response;
    } else {
        return NextResponse.redirect(`${BASEURL}/unauthorized`);
    }
};

const handleHours = async (userData) => {
    if (userData) {
        if (!userData.isEmployer) {
            const ids = await fetchIds(userData, true);
            let response = NextResponse.next();
            response.headers.append("ids", JSON.stringify(ids));
            return response;
        } else {
            return NextResponse.redirect(`${BASEURL}/coming-soon`);
        }
    } else {
        return NextResponse.redirect(`${BASEURL}/unauthorized`);
    }
};

const handleRegisterCompany = async (userData) => {
    if (userData) {
        if (userData.isEmployer) {
            const id = await fetchIds(userData, false);
            let response = NextResponse.next();
            response.headers.append("id", JSON.stringify(id));
            return response;
        } else {
            return NextResponse.redirect(`${BASEURL}/unauthorized`);
        }
    } else {
        return NextResponse.redirect(`${BASEURL}/unauthorized`);
    }
}

const handlePayroll = async (userData) => {
    if (userData) {
        if (userData.isEmployer) {
            const ids = await fetchIds(userData, true);
            let response = NextResponse.next();
            response.headers.append("ids", JSON.stringify(ids));
            return response;
        } else {
            return NextResponse.redirect(`${BASEURL}/coming-soon`);
        }
    } else {
        return NextResponse.redirect(`${BASEURL}/unauthorized`);
    }
}

const decodeToken = async (req) => {
    const { cookies } = req;
    const decoded = await (
        await fetch(`${BASEURL}/api/services/validateToken`, {
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

const fetchIds = async (userData, fetchCompanyId) => {
    if (userData) {
        const ids = await (
            await fetch(`${BASEURL}/api/services/fetchIds`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    email: userData.email,
                    fetchCompanyId,
                },
            })
        ).json();
        return ids;
    }
    return null;
};
