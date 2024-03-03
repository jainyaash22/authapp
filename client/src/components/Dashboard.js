import React, { useContext, useEffect ,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './ContextProvider/Context';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import MediaCard from './Card';
import { ButtonBase, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, Typography, Avatar, Divider } from '@mui/material'
import Search from './Search';
// import { Box } from "@mui/system";
// import Search from './Search';

const Dashboard = () => {

    const { logindata, setLoginData } = useContext(LoginContext);

    const [data, setData] = useState(false);
    const [productData, setProductData] = useState([]);
    const [displayData, setDisplayData] = useState([]);


    const history = useNavigate();

    const DashboardValid = async () => {
        let token = localStorage.getItem("usersdatatoken");

        const res = await fetch("/validuser", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        const data = await res.json();

        if (data.status == 401 || !data) {
            history("*");
        } else {
            console.log("user verify");
            setLoginData(data)
            history("/dash");
        }

        const products = await fetch("/products", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })
        .then((data) => data.json())
        .then((data) => {
            setProductData(data)
            setDisplayData(data)
        })
        .catch((err) => console.log(err))
    }


    useEffect(() => {
        setTimeout(() => {
            DashboardValid();
            setData(true)
        }, 2000)

    }, [])

    return (
        <>
            <Search displayData = {productData} setDisplayData = {setDisplayData} />
            {
                displayData.length ? (
                    <Grid container spacing={{ xs: 2, md: 3 }} justifyContent='space-around' sx = {{margin : "20px"}}>
                        {
                            displayData?.map((product, i) => (
                                <MediaCard {...product} key = {i}/>
                            ))
                        }
                    </Grid>
                ) : (
                    <Typography> No Results Found </Typography>
                )
            }
        </>

    )
}

export default Dashboard;





