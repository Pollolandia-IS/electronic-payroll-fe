import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";

const Text = styled("div")({
    textAlign: `left`,
    whiteSpace: `pre-wrap`,
    color: `rgba(0, 0, 0, 1)`,
    fontStyle: `normal`,
    fontFamily: `Inter`,
    fontWeight: `600`,
    fontSize: `28.000001907348633px`,
    letterSpacing: `0px`,
    textDecoration: `none`,
    textTransform: `none`,
    margin: `50px 0 0 50px`,
});

const comingSoon = () => {
    return (
        <div>
            <Text>Esta sección esta en desarrollo</Text>
            <Link href="/">
                <Button variant="contained" color="primary" sx={{margin: '50px'}} >
                    {" "}
                    Volver{" "}
                </Button>
            </Link>
        </div>
    );
};

export default comingSoon;
