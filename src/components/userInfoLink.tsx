import { useState } from "react";
import { Pressable, Text } from "react-native";
import { UserSchema } from "../apis";
import { styles } from "../utils/styles";
import UserInfoModal from "./modals/userInfoModal";

export interface UserInfoLinkProps {
  user: UserSchema;
}

export default function UserInfoLink(props: UserInfoLinkProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Pressable onPress={() => setOpen(true)}>
        <Text style={[styles.text, { textAlign: 'center', color: 'blue', textDecorationLine: 'underline' }]}>
          {props.user.username}
        </Text>
      </Pressable>
      <UserInfoModal open={open} close={() => setOpen(false)} user={props.user} />
    </>

  )
}