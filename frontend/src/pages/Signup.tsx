import React, { useEffect } from 'react'
import { Box, Typography, Button } from '@mui/material'
import CustomizedInput from '../components/shared/CustomizedInput'
import { IoIosLogIn } from 'react-icons/io'
import { useAuth } from '../context/AuthContext'
import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom'
const Signup = () => {
  const auth = useAuth();
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault(); // prevents page reload when user clicks the submit button
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    // console.log(email,password)
    try{
      toast.loading("Signing In", {id:"login"});
      await auth?.signup(name,email,password);
      toast.success("Signed In Successfully", {id:"login"});
    }
    catch(error){
      console.log(error);
      toast.error("Signing In Failed", {id:"login"});
    }
  }
  const navigate = useNavigate();
  useEffect(()=>{
    if(auth?.user){
      navigate('/chat');
    }
  },[auth])
  return (
    <Box
      width={'100%'}
      height={'100%'}
      display="flex"
      flex={1}
    >
      <Box padding = {8} //8 = 64px padding in MUI
        mt={8}
        display={{md:"flex", sm:"none", xs:"none"}}
      >
          <img src="robott.png" alt="Robot" style={{width:"400px"}} />
      </Box>
      <Box display={"flex"} 
            flex={{xs:1, md:0.5}} 
            justifyContent={"center"}
            padding={2}
            ml={"auto"}
            mt={16}
      >
        <form 
                onSubmit={handleSubmit}
                style={{margin:'auto', 
                      padding:'30px', 
                      boxShadow:"10px 10px 20px #000", 
                      borderRadius:"10px", 
                      border:"none"}}
        >
          <Box sx={{
            display : "flex",
            flexDirection: "column",
            justifyContent : "center"
            }}
          >
            <Typography variant="h4"
              textAlign="center"
              padding={2}
              fontWeight={600}
            >
              Signup
            </Typography>
            <CustomizedInput type='text' name='name' label='Name'></CustomizedInput>
            <CustomizedInput type='email' name='email' label='Email'></CustomizedInput>
            <CustomizedInput type='password' name='password' label='Password'></CustomizedInput>
            <Button type="submit" sx={{
              px:2,
              py:1,
              mt:2,
              width:"400px",
              borderRadius:2,
              bgcolor:"#00ffc", 
              ":hover":{
                bgcolor : "white",
                color : "black",
              }, 
            }}
            endIcon={<IoIosLogIn/>}
            >
              Signup
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  )
}

export default Signup;