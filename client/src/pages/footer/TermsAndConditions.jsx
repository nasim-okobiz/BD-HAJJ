import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import api from '../../components/axios/Axios';

const TermsAndConditions = () => {
  const [data, setData] = useState()
  useEffect(() => {
   const fetchData = async () => {
     const response = await api.get("/policy/terms-conditions");
     setData(response?.data?.data);
   };
   fetchData();
 }, []);
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Terms and Conditions</h2>

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

export default TermsAndConditions;
