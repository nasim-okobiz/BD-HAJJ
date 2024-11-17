import React from "react";
import Containar from "../components/container/Containar";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";
import btnshapeup from "../assets/add/masjid.png";
import btnshapedown from "../assets/add/masjidshape.png";
import { useSelector } from "react-redux";
import { useState } from "react";
import api from "../components/axios/Axios";
import { useEffect } from "react";
import membership_inner from "../assets/membership/membership-inner.jpg"
const MembershipPage = () => {
  const role = useSelector((store) => store?.auth?.user?.role);
  console.log(role);
  const [joinuss, setJoinuss] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const getJoinuss = async () => {
    try {
      const response = await api.get(`/join-us`);
      setJoinuss(response?.data?.data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getJoinuss();
  }, []);
  return (
    <div>
      <section className="membership-inner-header font-philo">
        <div className="py-5 pl-4 sm:pl-[140px] bg-gray-100 z-10">
          <Containar>
            <div>
              <nav className="flex items-center space-x-2 text-gray-600 text-base sm:text-lg">
                <Link to="/" className="hover:text-semisecondary font-bold">
                  Home
                </Link>
                <AiOutlineRight />
                <span className="text-sm sm:text-lg">Membership</span>
              </nav>
            </div>
          </Containar>
        </div>
        <Containar className={"py-16"}>
          <h1
            className="text-center text-[32px] sm:text-[60px] font-semibold text-semisecondary"
            style={{
              textShadow: "1px 1px 1px #000000b0",
            }}
          >
            BD Umrah Hajj Kafela Membership / Franchise
          </h1>
          <img
            src={membership_inner}
            className="w-full mt-6 rounded-xl"
            alt="BD Umrah Hajj Kafela Membership"
          />
        </Containar>
      </section>
      <section className="mt-4 membership-questions font-philo pb-16 md:pb-36">
        <Containar>
          <div>
            <h2 className="text-[22px] sm:text-[36px] font-bold mb-4">
              How BD Umrah Hajj Kafela Franchise Works?
            </h2>
            <p className="text-justify mb-6 text-[16px] sm:text-[18px]">
              BD Umrah Hajj Kafela International Travels is indeed the best and
              the reputed service providers in Dhaka, giving away the best Umrah
              services to millions of pilgrims. You can too initiate your
              business, Umrah pilgrimages through our franchise opportunity. To
              join hands with one of the best Umrah travel partners of Dhaka,
              you need to know about the detailed process, which are as follows:
            </p>
          </div>

          <div className="grid grid-cols-1">
            <div className="col-span-1">
              <div className="card bg-white shadow-md p-4">
                <div className="overflow-x-auto">
                  <table className="table-auto w-full text-left">
                    <thead className="bg-gray-200 text-[16px] sm:text-[20px]">
                      <tr>
                        <th className="px-4 py-2">PARTICULARS</th>
                        <th className="px-4 py-2">DIAMOND</th>
                        <th className="px-4 py-2">GOLD</th>
                        <th className="px-4 py-2">SILVER</th>
                      </tr>
                    </thead>
                    <tbody className="customtable text-[16px] sm:text-[18px]">
                      <tr>
                        <td className="border px-4 py-2">
                          2 years Franchise Fee (Non-refundable)
                        </td>
                        <td className="border px-4 py-2">100 bookings</td>
                        <td className="border px-4 py-2">50 bookings</td>
                        <td className="border px-4 py-2">
                          Rs {joinuss[0]?.amount}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">Certificates</td>
                        <td className="border px-4 py-2">Yes</td>
                        <td className="border px-4 py-2">Yes</td>
                        <td className="border px-4 py-2">Yes</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">Identity Card</td>
                        <td className="border px-4 py-2">Yes</td>
                        <td className="border px-4 py-2">Yes</td>
                        <td className="border px-4 py-2">Yes</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">Marketing Support</td>
                        <td className="border px-4 py-2">Yes</td>
                        <td className="border px-4 py-2">Yes</td>
                        <td className="border px-4 py-2">Yes</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">One Banner Design</td>
                        <td className="border px-4 py-2">Yes</td>
                        <td className="border px-4 py-2">Yes</td>
                        <td className="border px-4 py-2">Yes</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">
                          Leads will be provided if there is any inquiry from
                          your locality or nearby area
                        </td>
                        <td className="border px-4 py-2">Yes</td>
                        <td className="border px-4 py-2">Yes</td>
                        <td className="border px-4 py-2">Yes</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">Free Umrah</td>
                        <td className="border px-4 py-2">Full Free</td>
                        <td className="border px-4 py-2">50% Free</td>
                        <td className="border px-4 py-2">N/A</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-[20px] sm:text-[22px]">
                  Silver For general
                </p>
                <div>
                  <p className="text-[18px] sm:text-[20px]">
                    Rs {joinuss[0]?.amount}/-
                  </p>
                </div>
              </div>
              <div>
                <p className="font-semibold text-[20px] sm:text-[22px]">
                  Silver For others (alem / mufti / Moulana / Hafez / Imam /
                  Teacher / General)
                </p>
                <div>
                  <p className="text-[18px] sm:text-[20px]">
                    Rs {joinuss[0]?.amount}/-
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-10 text-[16px] sm:text-[18px]">
              <p>
                All new members are valid for 2 years; therefore, you need to
                renew at the same price.
              </p>
              <p>
                After successful payment, members will get an invoice and a
                UNIQUE ID number via email.
              </p>
            </div>
          </div>

          <div className="membership-reg-instruction mt-6 text-[16px] sm:text-[18px]">
            <p className="mt-4">
              Here is the list of all that you need to provide to start your own
              business from today: Personal Documents of Proprietor, Partners,
              or Directors (Any 3 are mandatory)
            </p>
            <ul className="list-disc pl-5">
              <li>NID Card (Mandatory)</li>
              <li>Saving Bank Account Statement</li>
              <li>Passport</li>
              <li>Electric Bill</li>
              <li>Telephone Bill</li>
            </ul>
            <p className="mt-4 text-[16px] sm:text-[18px]">
              <span className="font-semibold">Note:</span> Please keep the
              above-mentioned docs handy before applying online for membership.
            </p>
            <p>
              Please contact BD Umrah Hajj Kafela for further queries - +44 078
              9101 1714
            </p>
            <p>
              We look forward to working as a team to serve all the pilgrims and
              be a medium for their Umrah pilgrimages, with your humble support.
            </p>
          </div>
          <div className="text-center md:text-left mt-10 sm:mt-28">
            <div className="flex justify-center">
              {role !== "agent" && (
                <div className="relative group cursor-pointer ">
                  <img
                    className="w-[30px] sm:w-[60px] absolute group-hover:left-[70%] left-[10%] transition-all ease-in-out duration-300 -top-[80%]"
                    src={btnshapeup}
                    alt="Button Shape Up"
                  />
                  <img
                    className="w-[150px] sm:w-[300px]"
                    src={btnshapedown}
                    alt="Button Shape Down"
                  />

                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-[14px] sm:text-2xl font-semibold">
                    <Link
                      to={"/membership/membership-details-form"}
                      className="button "
                    >
                      Apply Now
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Containar>
      </section>
    </div>
  );
};

export default MembershipPage;
