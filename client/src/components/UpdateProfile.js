import React, { useContext, useEffect ,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './ContextProvider/Context';           
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import MediaCard from './Card';
import { ButtonBase, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, Typography, Avatar, Divider } from '@mui/material'
import Search from './Search';

const UpdateProfile = () => {

    const { logindata, setLoginData } = useContext(LoginContext);

    const [data, setData] = useState(false);

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
            history("/updateprofile");
        }
    }

    useEffect(() => {
        setTimeout(() => {
            DashboardValid();
            setData(true)
        }, 2000)

    }, [])

    const [fname, setFname] = useState('');
    const [message, setMessage] = useState('');

    const handleFnameChange = (e) => {
        setFname(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/users/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    userId : logindata.ValidUserOne._id,
                    fname : fname
                 })
            });

            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            console.error('Error updating profile:', error.message);
            setMessage('Error updating profile. Please try again.');
        }
    };

    return (
        <div>
            <h2>Update Profile</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="fname">First Name:</label>
                    <input
                        type="text"
                        id="fname"
                        value={fname}
                        onChange={handleFnameChange}
                    />
                </div>
                <button type="submit">Update</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    )
}

export default UpdateProfile