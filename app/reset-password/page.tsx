"use client";
import React, { useEffect } from "react";
import { checktoken } from "../hooks/user/useUser";
import { useSearchParams } from "next/navigation";

function ResetPassword() {
  const params = useSearchParams();
  const email = params.get("email");
  const token = params.get("token");
  const { data, isLoading, error, isError } = checktoken(email, token);
  if (data?.code === 400) {
    return (
      <div className=" flex self-center justify-center">
        <div className="flex self-center">
          Bağlantınızın süresi dolmuş lütfen yeni bir bağlantı talep edin
        </div>
      </div>
    );
  }
  console.log(data?.code);
  return <div>ResetPassword</div>;
}

export default ResetPassword;
