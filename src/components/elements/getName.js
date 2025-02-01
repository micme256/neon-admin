import { useContext } from "react";
import { MemberContext } from "../../App";

export const getName = (memberId) => {
  const { members } = useContext(MemberContext);
  const member = members.find((member) => member.memberId === memberId);
  return member.memberName;
};
