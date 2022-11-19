import React, { useEffect } from "react";
import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { profile } from "../Redux/AuthReducer/action";
import { getLocalData } from "../libs/localStorage";

const Profile = () => {
  const dispatch = useDispatch();

  const profileData = useSelector((state) => state.AuthReducer?.profileData);
  console.log(profileData);
  useEffect(() => {
    if (profileData?.length === 0) {
      const token = getLocalData("token");
      const username = getLocalData("userCredentials");
      const payload = {
        username: username,
        token,
      };
      dispatch(profile(payload));
    }
  }, [dispatch, profileData?.length]);
  return (
    <Box>
      <Flex direction="row" padding="0.5rem">
        <Box width="30%">
          <Avatar
            name={profileData.length !== 0 ? profileData.name : "joel"}
            src={
              profileData.length !== 0
                ? profileData.description
                : "https://img.icons8.com/fluency/2x/microsoft-todo-2019.png"
            }
          />
        </Box>
        <Flex direction="column" width="70%">
          <Text fontWeight="bold" fontSize="18px">
            {profileData.length !== 0 ? profileData.name : ""}
          </Text>
        </Flex>
      </Flex>
      <Box textAlign="right" paddingRight="0.5rem">
        <Button color="navy" variant="link">
          Account
        </Button>
      </Box>
    </Box>
  );
};

export default Profile;
