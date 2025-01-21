import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../components/axios/Axios';
import { IoMdCheckmark } from "react-icons/io";
import { HiMiniXMark } from "react-icons/hi2";
import { useParams } from 'react-router-dom';

const NewBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {id} = useParams()

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await api.get(`/booking/pagination?page=1&limit=5&order=ASC&membershipRef=${id}`);
        setBookings(response.data.data.result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4 bg-white">
      <h1 className="text-2xl font-semibold mb-4">New Bookings</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b-2 border-gray-300 text-left">Booking ID</th>
              <th className="px-4 py-2 border-b-2 border-gray-300 text-left">Package Name</th>
              <th className="px-4 py-2 border-b-2 border-gray-300 text-left">Person</th>
              <th className="px-4 py-2 border-b-2 border-gray-300 text-left">Payment</th>
              <th className="px-4 py-2 border-b-2 border-gray-300 text-left">Total Price</th>
              <th className="px-4 py-2 border-b-2 border-gray-300 text-left">Booking Date</th>
              <th className="px-4 py-2 border-b-2 border-gray-300 text-left">Comission</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td className="px-4 py-2 border-b border-gray-300">{booking?.bookingId}</td>
                <td className="px-4 py-2 border-b border-gray-300">{booking?.packageRef?.name}</td>
                <td className="px-4 py-2 border-b border-gray-300">{booking?.totalPerson}</td>
                <td className="px-4 py-2 border-b border-gray-300">{booking?.totalDue < 1 ? <span className='text-green-600'>Paid</span> : <span className='text-red-600'>Due</span> }</td>
                <td className="px-4 py-2 border-b border-gray-300">Tk. {booking?.totalPrice}</td>
                <td className="px-4 py-2 border-b border-gray-300">{new Date(booking?.bookingDate).toLocaleDateString()}</td>
                <td className="px-4 py-2 border-b border-gray-300 text-xl ">
                  {booking.agentCommissions > 0 ? (
                    <IoMdCheckmark className="text-green-600"/>
                  ) : (
                    <HiMiniXMark className="text-red-600"/>
                  )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewBooking;
