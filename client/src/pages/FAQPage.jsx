import React, { useState, useRef } from "react";
import Containar from "../components/container/Containar";
import { Link, useLocation, useParams } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import bgshape from "../assets/pattern/pattern.jpg";
import api from "../components/axios/Axios";
import { useEffect } from "react";

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const contentRefs = useRef([]);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // const faqs = [
  //   {
  //     question: "What is Umrah?",
  //     answer:
  //       "Umrah is a pilgrimage to Mecca, Saudi Arabia, which can be undertaken at any time of the year. It's often referred to as the 'lesser pilgrimage' compared to Hajj.",
  //   },
  //   {
  //     question: "Who can perform Umrah?",
  //     answer:
  //       "Umrah is open to all adult Muslims, male and female, who are physically and financially capable of undertaking the journey.",
  //   },
  //   {
  //     question:
  //       "Do I need to perform Umrah in a specific month or time of the year?",
  //     answer:
  //       "Unlike Hajj, Umrah can be performed at any time of the year, as it is not bound by specific months.",
  //   },
  //   {
  //     question: "What are the rituals of Umrah?",
  //     answer:
  //       "The rituals of Umrah include wearing Ihram, performing Tawaf (circumambulation) around the Kaaba, Sa'i (walking between the hills of Safa and Marwa), and shaving or trimming the hair.",
  //   },
  //   {
  //     question: "Do I need a visa to perform Umrah?",
  //     answer:
  //       "Yes, you need a visa to enter Saudi Arabia for Umrah. This visa can be obtained through authorized travel agents or online portals.",
  //   },
  //   {
  //     question: "What is Ihram, and when should I enter it?",
  //     answer:
  //       "Ihram is a state of ritual purity and dress worn during Umrah. Men wear two pieces of unstitched cloth, while women observe modest clothing. Ihram should be entered before crossing the Miqat, which are specific points demarcated for entering the state of Ihram.",
  //   },
  //   {
  //     question: "Can I combine Umrah with Hajj?",
  //     answer:
  //       "Yes, it's possible to combine Umrah with Hajj in the same journey, known as Hajj al-Tamattu or 'integrated Hajj.' This involves performing Umrah first, then exiting Ihram, and re-entering Ihram for Hajj at a later date.",
  //   },
  //   {
  //     question: "What are the recommended etiquettes during Umrah?",
  //     answer:
  //       "Observing humility, patience, and kindness towards fellow pilgrims, maintaining cleanliness, avoiding arguments or disputes, and engaging in frequent supplication and remembrance of Allah are highly recommended during Umrah.",
  //   },
  //   {
  //     question:
  //       "Is there any specific du'a (supplication) to recite during Umrah?",
  //     answer:
  //       "While there are no fixed du'as to recite during Umrah, it is encouraged to engage in constant remembrance and supplication to Allah, seeking forgiveness, guidance, and blessings. Additionally, reciting Quranic verses and the various prescribed supplications (du'as) taught by the Prophet Muhammad (peace be upon him) are highly recommended.",
  //   },
  // ];
  
  const [faqs, setFAQs] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const location = useLocation();
  const { id } = useParams();
  
  const getFAQs = async () => {
    try {
      const response = await api.get(`/faq`);
      setFAQs(response?.data?.data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false); 
    }
  };
  useEffect(() => {
    getFAQs();
  }, [id]);

  return (
    <section className="faq-section relative bg-gray-50 font-merriweather">

      <div className="py-5 pl-4 sm:pl-[140px] bg-gray-100 z-10">
        <Containar>
          <div className="">
            <nav className="flex items-center space-x-2 text-gray-600 text-lg">
              <Link to="/" className="hover:text-semisecondary font-bold block">
                Home
              </Link>
              <AiOutlineRight />
              <span>FAQ</span>
            </nav>
          </div>
        </Containar>
      </div>

      <Containar className="pb-12 sm:pb-32 pt-8 sm:pt-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6 text-gray-800">
          Frequently Asked Questions
        </h2>
        <div id="accordionExample" className="space-y-2 sm:space-y-4 mt-8 sm:mt-16">
          {faqs.map((faq, index) => (
            <div key={index} className="accordion-item border rounded-lg">
              <h2 className="accordion-header mb-0">
                <button
                  className={`accordion-button flex items-center justify-between w-full py-3 sm:py-4 px-4 sm:px-6 bg-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out ${
                    activeIndex === index ? "bg-blue-100" : ""
                  }`}
                  onClick={() => toggleAccordion(index)}
                >
                  <span className="text-[16px] sm:text-[22px] font-semibold text-gray-800">
                    {faq.title}
                  </span>
                  <span className="text-gray-500">
                    {activeIndex === index ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </span>
                </button>
              </h2>
              <div
                ref={(el) => (contentRefs.current[index] = el)}
                className={`accordion-collapse overflow-hidden transition-all duration-500 ease-in-out max-h-0 ${
                  activeIndex === index ? "max-h-96" : ""
                }`}
                style={{
                  maxHeight:
                    activeIndex === index
                      ? contentRefs.current[index]?.scrollHeight
                      : "0px",
                }}
              >
                <div className="accordion-body py-4 px-4 sm:px-6 bg-white text-gray-600 text-[16px] sm:text-[20px]">
                  {faq.details}
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-600 mt-8">
          Can't find your question?{" "}
          <Link to="/contact-us" className="text-blue-500 hover:underline">
            Contact Us
          </Link>
        </p>
      </Containar>
    </section>
  );
};

export default FAQPage;
