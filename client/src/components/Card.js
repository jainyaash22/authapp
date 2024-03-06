import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard(props) {

  console.log(props)
  const [message, setMessage] = React.useState("");

  const handleCLick = async(productId) => {
    setMessage("")
    try {
      const userId = props.user.ValidUserOne._id
      // Prepare request data
      const requestData = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "userId" : userId,
            "productId" : productId
           })
      };

      // Make the request to add bookmark
      const response = await fetch('/users/addbookmark', requestData);
      const data = await response.json();

      // Check if bookmark was added successfully
      if (response.ok) {
          console.log('Bookmark added successfully:', data);
          setMessage("Added Successsfully")
      } else {
          console.error('Failed to add bookmark:', data.error);
          setMessage(data.error)
      }
  } catch (error) {
      console.error('Error adding bookmark:', error.message);
  }
  } 

  return (
    <Card sx={{ maxWidth: 345 , margin : "30px", backgroundColor : "teal"}}>
      <CardMedia
        sx={{ height: 140 }}
        image={props.imageUrl}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" sx = {{backgroundColor : "black", color : "#fff"}}>{props.price}</Button>
        {
          props.bookmark ? (
            <></>
          ) :
          (

            <Button size='small' sx = {{backgroundColor : "black", color : "#fff"}} onClick={() => handleCLick(props._id)}>Add to Bookmark</Button>
          )

        }
      </CardActions>
      {
        message != "" ? (
          <Typography sx = {{ color : "#fff"}}>{message}</Typography>
        ) : (
          <div></div>
        )
      }
    </Card>
  );
}
