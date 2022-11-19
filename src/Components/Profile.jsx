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
      <Flex direction="row" padding="1.5rem">
        <Box width="30%">
          <Avatar
            // name={profileData.length !== 0 ? profileData.name : "joel"}
            src={"https://avatars.githubusercontent.com/u/19718580?s=400&u=5590595413f275e0ee8ba25bda9e330b750492c3&v=4"}
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
