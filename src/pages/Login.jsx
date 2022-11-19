import { ViewIcon } from "@chakra-ui/icons";
import {
  Box,Button,Checkbox,Flex,FormControl,FormLabel,Heading,Input,InputGroup,InputRightElement,Link,Stack,Text,useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { login } from "../Redux/AuthReducer/action";

const Login = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const comingFrom = location.state?.from?.pathname || "/";
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [eye, setEye] = useState(false);

  const handleEye = () => {
    setEye((prev) => !prev);
  };
  const loginHandler = () => {
    if (email && password) {
      const params = {
        email,
        password,
      };

      dispatch(login(params, toast)).then((r) => {
        navigate(comingFrom, { replace: true });
      });
    }
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Stack
        spacing={8}
        mx={"auto"}
        maxW={"lg"}
        py={12}
        px={6}
        color={"black"}
        borderRadius={"2rem"}
        bg={"#FFFFFF"}
      >
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Login in </Heading>
        </Stack>
        <Box rounded={"lg"} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <FormControl id="username" isRequired>
              <FormLabel>Email/Username</FormLabel>
              <Input
                type="text"
                value={email}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={eye ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement h={"full"}>
                  <Button variant={"ghost"} onClick={handleEye}>
                    <ViewIcon />
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={"#2cf2ba"}>Forgot password?</Link>
              </Stack>
              <Button
                bg={"#4534554f"}
                color={"black"}
                _hover={{
                  bg: "white",
                }}
                onClick={loginHandler}
              >
                Sign in
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Don't have an account yet ?{" "}
                <RouterLink to="/signup" color={"blue.600"}>
                  Create Account
                </RouterLink>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
