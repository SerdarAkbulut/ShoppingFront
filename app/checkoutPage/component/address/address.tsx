import request from "@/app/api/client/request";
import { setOrder } from "@/app/store/order/orderSlice";
import { RootState } from "@/app/store/store";
import AddUserAdress from "@/app/user/address/addUserAddress";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function UserAddresses() {
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const order = useSelector((state: RootState) => state.order);
  const { data } = useQuery({
    queryKey: ["UserAddress"],
    queryFn: () => request.Address.getAddress(),
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setOrder({ orderAddress: selectedAddress }));
  }, [selectedAddress]);

  if (data?.length === 0) {
    return <div>Kayıtlı adres bulunamadı</div>;
  } else {
    return (
      <div className="flex gap-5 flex-wrap">
        {data?.map((item: any) => (
          <div className="bg-gray-300 p-5 rounded-lg" key={item.id}>
            <div className="flex justify-between items-center mb-2">
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  value={selectedAddress || order.orderAddress}
                  onChange={(e) =>
                    setSelectedAddress(
                      e.currentTarget.value
                        ? Number(e.currentTarget.value)
                        : null
                    )
                  }
                >
                  <FormControlLabel
                    value={item.id}
                    control={<Radio />}
                    label=""
                  />
                </RadioGroup>
              </FormControl>
              <div>ssss</div>
            </div>

            <div>
              <div className="flex gap-4">
                <span className="font-bold">Alıcı: {item.adSoyad}</span>
              </div>
              <div>
                {item.sehir}/{item.ilce}
              </div>
              <div className="flex gap-4">
                <div>
                  {item.sokak}/{item.cadde}
                </div>
                <div>BinaNo:{item.apartmanNo}</div>
                <div>Daire:{item.daireNo}</div>
              </div>

              <div className="mt-5">
                <h2 className="font-bold">Açık adres</h2>
                {item.fullAddress}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

function Address() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="p-5">
        <a
          className="items-start inline hover:cursor-pointer"
          onClick={() => setOpen(true)}
        >
          Ekle
        </a>
      </div>
      <UserAddresses />
      <AddUserAdress open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

export default Address;
