import { TextField } from "@mui/material";
import { Splitter, SplitterPanel } from "primereact/splitter";
import React from "react";
import UserInfo from "./components/userInfo";
import { Divider } from "primereact/divider";
import UserPassword from "./components/userPassword";

function UserSettings() {
  return (
    <div className="flex justify-center">
      <div className="w-1/3 mt-20 flex border  shadow-xl p-3 justify-center rounded-xl">
        <div className="w-1/2">
          <UserInfo />
        </div>
        <Divider layout="vertical" className="border border-gray-400" />
        <div className="w-1/2">
          <UserPassword />
        </div>
      </div>
    </div>
  );
}

export default UserSettings;
