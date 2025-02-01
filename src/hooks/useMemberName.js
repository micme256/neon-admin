import { useState, useEffect, useContext } from "react";
import { MemberContext } from "../App";

const useMemberName = () => {
  const { members } = useContext(MemberContext);
  const [selectedId, setSelectedId] = useState(null);
  const [memberName, setMemberName] = useState("");

  useEffect(() => {
    if (selectedId) {
      const member = members.find((m) => m.memberId === selectedId);
      setMemberName(member ? member.name : "");
    } else {
      setMemberName("");
    }
  }, [selectedId, members]);

  return { selectedId, setSelectedId, memberName };
};

export default useMemberName;
