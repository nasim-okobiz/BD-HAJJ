import React, { useState, useEffect } from "react";
import Containar from "../components/container/Containar";
import bgshape from "../assets/pattern/pattern.jpg";
import { RiDoubleQuotesL } from "react-icons/ri";
import { FaCopy, FaCheck } from 'react-icons/fa';
import { API_BASE_URL } from "../components/axios/config";
import axiosInstance from "../../../dashboard/src/Components/Axios";

const MemberDetails = () => {
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedStates, setCopiedStates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage] = useState(8);
  
  // New states for filters
  const [memberId, setMemberId] = useState("");
  const [phone, setPhone] = useState("");

  const fetchMemberships = async (page, filters = {}) => {
    try {
      const { memberId, phone } = filters; // Destructure filters
      const response = await axiosInstance.get(
        `${API_BASE_URL}/membership/pagination?page=${page}&limit=${itemsPerPage}&order=DESC${memberId ? `&memberId=${memberId}` : ''}${phone ? `&phone=${phone}` : ''}`
      );
      setMemberships(response?.data?.data?.result);
      setTotalPages(response?.data?.data?.pagination?.totalPage);
      setCopiedStates(Array(response?.data?.data?.result.length).fill(false));
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchMemberships(currentPage, { memberId, phone });
    }, 3000);

    fetchMemberships(currentPage, { memberId, phone });

    // Clear interval on cleanup
    return () => clearInterval(interval);
  }, [currentPage, memberId, phone]);


  const handleCopy = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedStates((prev) => {
      const newCopiedStates = [...prev];
      newCopiedStates[index] = true;
      return newCopiedStates;
    });

    setTimeout(() => {
      setCopiedStates((prev) => {
        const newCopiedStates = [...prev];
        newCopiedStates[index] = false;
        return newCopiedStates;
      });
    }, 2000);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMemberships(currentPage, { memberId, phone }); // Re-fetch with filters
  };

  if (loading) return <p>Loading memberships...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="relative font-merriweather pt-2 sm:pt-28">
      <div className="absolute left-0 top-0 w-full h-full opacity-10 z-0">
        <img className="w-full h-full" src={bgshape} alt="Background" />
      </div>

      <Containar className="relative z-10">
        <h2 className="text-[24px] sm:text-[40px] font-semibold text-left sm:text-center text-secondary drop-shadow-lg">
          Our Members
        </h2>
        <p className="text-[22px] sm:text-[30px] text-semisecondary text-left sm:text-center font-semibold text-secondary-color font-century drop-shadow-md">
          Approvals &amp; Certification Of BD Umrah Hajj Kafela
        </p>

        {/* Filter Bar */}
        <p className="text-[12px] sm:text-[16px]  text-left sm:text-center mt-8  text-secondary-color font-century drop-shadow-md">
          Search by Agent ID or Phone Number 
        </p>
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row justify-center mt-4 ">
          <input
            type="text"
            placeholder="Agent ID"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            className="border rounded p-2 m-1"
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border rounded p-2 m-1"
          />
        </form>

        <div className="memberships sm:mt-10">
          <section className="section__container relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {memberships?.map((membership, index) => (
              <div key={index} className="section__card max-h-[550px]  bg-white shadow-md rounded-md p-4 relative z-20">
                <div className="absolute left-4 top-4 text-white text-[28px]">
                  <RiDoubleQuotesL />
                </div>
                <img src={API_BASE_URL + membership?.photo} alt={membership?.name} className="h-28 w-28 mb-4 rounded-full mx-auto" />
                <h5 className="text-center font-semibold capitalize">{membership?.name}</h5>

                <div className="flex items-center space-x-2 mb-2">
                  <p className="line-clamp-4 m-0 text-gray-800">MemberShip ID: {membership?.referCode}</p>
                  <button
                    onClick={() => handleCopy(membership?.referCode, index)}
                    className="text-blue-500 hover:text-blue-700 focus:outline-none"
                  >
                    <p>{copiedStates[index] ? <FaCheck className="text-green-500" /> : <FaCopy />}</p>
                  </button>
                </div>

                {/* Additional Information Section */}
                <div className="text-left mb-12">
                  <p className="m-0 font-medium">Phone: {membership?.phone}</p>
                  <p className="m-0 font-medium">Agent Type: {membership?.agentType}</p>
                  <p className="m-0 font-medium">Occupation: {membership?.occupation}</p>
                  <p className="m-0 font-medium">Person: {membership?.personCategory}</p>
                </div>
              </div>
            ))}
          </section>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
            >
              Previous
            </button>
            <span className="px-4 py-2 text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`px-4 py-2 ${currentPage === totalPages || totalPages === 0 ? 'opacity-50 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
            >
              Next
            </button>
          </div>
        </div>
      </Containar>
    </div>
  );
};

export default MemberDetails;
