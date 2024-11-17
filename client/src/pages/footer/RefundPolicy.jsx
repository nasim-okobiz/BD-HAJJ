import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import api from "../../components/axios/Axios";

const RefundPolicy = () => {
  const [data, setData] = useState()
  useEffect(() => {
   const fetchData = async () => {
     const response = await api.get("/policy/refund-policy");
     setData(response?.data?.data);
   };
   fetchData();
 }, []);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Refund Policy</h1>
      {
        data && (
          <div className="p-6 rounded-lg   mx-auto">
            <div
              className="prose prose-lg text-gray-700"
              dangerouslySetInnerHTML={{ __html: data[0]?.details }}
            />
          </div>
        )
      }
    </div>
  );
};

export default RefundPolicy;
