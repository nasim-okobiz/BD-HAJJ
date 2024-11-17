import React from "react";
import api from "../../components/axios/Axios";
import { useState } from "react";
import { useEffect } from "react";

const PrivacyPolicy = () => {
  const [data, setData] = useState()
   useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("/policy/privacy-policy");
      setData(response?.data?.data);
    };
    fetchData();
  }, []);
  

  return (
    <div className="py-5 sm:pl-[140px]  z-10 ">
      {
        data && (
          <div className="p-6 rounded-lg   mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Privacy Policy</h1>
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

export default PrivacyPolicy;
