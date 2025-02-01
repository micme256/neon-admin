import { Routes, Route } from "react-router-dom";
import Nav from "./components/pages/Nav";
import Dashboard from "./components/pages/Dashboard";
import Loans from "./components/pages/Loans";
import { createContext } from "react";
import Transactions from "./components/pages/Transactions";

export const MemberContext = createContext(null);

function App() {
  const members = [
    {
      memberId: "NEON/001",
      memberName: "TESIGA",
      memberEmail: "tesigagerald@gmail.com",
      memberPhone: "756479583",
      memberRole: "",
    },
    {
      memberId: "NEON/002",
      memberName: "ISHUTI",
      memberEmail: "inshutimugagga24@gmail.com",
      memberPhone: "0754519051/0776373779",
      memberRole: "",
    },
    {
      memberId: "NEON/003",
      memberName: "NKURUNZIZA",
      memberEmail: "nkulunzizanicholas@gmail.com",
      memberPhone: "0771492540/0752929416",
      memberRole: "",
    },
    {
      memberId: "NEON/004",
      memberName: "KASENGE",
      memberEmail: "kasengeben2@gmail.com",
      memberPhone: "",
      memberRole: "",
    },
    {
      memberId: "NEON/005",
      memberName: "NSHIMYE",
      memberEmail: "michaelnshimye@gmail.com",
      memberPhone: "256757206101/256782375218",
      memberRole: "",
    },
    {
      memberId: "NEON/006",
      memberName: "KYAGERA",
      memberEmail: "kyagerajoseph03@gmail.com",
      memberPhone: "256705495227",
      memberRole: "",
    },
    {
      memberId: "NEON/007",
      memberName: "BUNJO",
      memberEmail: "edrinelex555@gmail.com",
      memberPhone: "",
      memberRole: "",
    },
    {
      memberId: "NEON/008",
      memberName: "KIBERU",
      memberEmail: "kiberupeter940@gmail.com",
      memberPhone: "256758296869",
      memberRole: "",
    },
    {
      memberId: "NEON/009",
      memberName: "NDAYAMBAZE",
      memberEmail: "ndayambazedouglas@gmail.com",
      memberPhone: "",
      memberRole: "",
    },
    {
      memberId: "NEON/010",
      memberName: "KAYIIRA",
      memberEmail: "remigiuskayiira@gmail.com",
      memberPhone: "703497909",
      memberRole: "",
    },
    {
      memberId: "NEON/011",
      memberName: "MATOVU",
      memberEmail: "www.raymondmatovu@gmail.com",
      memberPhone: "256751818635/256776577027",
      memberRole: "",
    },
    {
      memberId: "NEON/012",
      memberName: "SSEMIRIMU",
      memberEmail: "armpitslit@gmail.com",
      memberPhone: "786838399",
      memberRole: "",
    },
    {
      memberId: "NEON/014",
      memberName: "WASSAJJA",
      memberEmail: "wasijjafrank@gmail.com",
      memberPhone: "702635037",
      memberRole: "",
    },
    {
      memberId: "NEON/015",
      memberName: "KISUBI",
      memberEmail: "rogerskisubi21@gmail.com",
      memberPhone: "758802207",
      memberRole: "",
    },
    {
      memberId: "NEON/016",
      memberName: "SEMayengo",
      memberEmail: "semayengomike@gmail.com",
      memberPhone: "758997170",
      memberRole: "",
    },
    {
      memberId: "NEON/017",
      memberName: "SEBAGALA",
      memberEmail: "Ronniesebaggala415@gmail.com",
      memberPhone: "0783 357376",
      memberRole: "",
    },
  ];
  return (
    <>
      <MemberContext.Provider value={{ members }}>
        <Nav />
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="loan" element={<Loans />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </MemberContext.Provider>
    </>
  );
}

export default App;
