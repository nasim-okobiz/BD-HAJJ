import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/logo/logo.png"; // Adjust this path as needed
import Containar from "../../container/Containar";
import api from "../../axios/Axios";


const Footer = () => {
  const location = useLocation();
  const [flag, setFlag] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    setFlag(location.pathname === "/login");
  }, [location.pathname]);
  useEffect(() => {
    api
      .get("/package/group")
      .then((response) => setData(response.data.data))
      .catch((err) => setError(err));
  }, []);
  console.log("first, location =========================", data)

  return (
    <div className={`${flag ? "bg-gray-100" : ""} font-philo`}>
      <footer
        className="footer relative bg-cover bg-fixed bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://www.hijazhajjnumrah.com/images/background/lantern-with-burning-candle-glowing-at-night.jpg)",
          height: "auto", // Adjust height for responsiveness
        }}
      >
        <div className="absolute inset-0 w-full bg-black bg-opacity-90 z-0"></div>
        <div
          className="absolute inset-0 top-0 left-0 w-full h-full z-10 hidden md:block"
          style={{
            borderTop: "130px solid transparent",
            borderImage:
              "url(https://www.hijazhajjnumrah.com/images/background/footer-border.png) 170 stretch",
          }}
        ></div>

        <section className="text-white relative z-20 pt-[150px] pb-10">
          <Containar>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Logo and About Section */}
              <div className="flex flex-col items-center md:items-start">
                <img className="logo mb-3 w-24 md:w-32" src={logo} alt="Logo" />
                <h3 className="text-center md:text-left mb-3">
                  At BD Umrah Hajj Kafela, we understand the significance of travel and strive
                  to make it accessible to all.
                </h3>
                <div className="social-icon flex space-x-3">
                  <a
                    href="https://www.facebook.com/mynilnod?mibextid=ZbWKwL"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-facebook"></i>
                  </a>
                  <a
                    href="https://youtube.com/@NilnodTravels?si=uHzb87N6bGmSAkJ2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-youtube"></i>
                  </a>
                  <a
                    href="https://www.instagram.com/nilnodinternational?utm_source=qr&amp;igsh=MTFvd2RkMXVyNWVxZw=="
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                </div>
              </div>

              {/* Important Links */}
              <div>
                <h3 className="text-xl mb-3 text-center md:text-left">
                  Important Links
                </h3>
                <ul className="space-y-2 text-center md:text-left">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/about-us">About Us</Link>
                  </li>
                  <li>
                    <Link to="/contact-us">Contact Us</Link>
                  </li>
                  <li>
                    <Link to="/our-gallery">Our Gallery</Link>
                  </li>
                  <li>
                    <Link to="/blog">Blog & Article</Link>
                  </li>
                  <li>
                    <Link to="/membership/details">Validate Member</Link>
                  </li>
                  <li>
                    <Link to="/privacy-policy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to="/terms-and-conditions">Terms & Conditions</Link>
                  </li>
                  <li>
                    <Link to="/refund-policy">Refund Policy</Link>
                  </li>
                </ul>
              </div>

              {/* More Important Links */}
              <div>
                <h3 className="text-xl mb-3 text-center md:text-left">
                  More Important Links
                </h3>
                <ul className="space-y-2 text-center md:text-left">
                  {data?.length > 0 && (
                    data.flatMap(category =>
                      category?.packages.slice(0, 5).map(item => (
                        <li key={item.id}>
                          <Link to={`/package/${item.id}`}>
                            {item?.name}
                          </Link>
                        </li>
                      ))
                    ).slice(0, 9)
                  )}

                </ul>
              </div>

              {/* Contact Details */}
              <div className="text-center md:text-left">
                <h3 className="text-xl mb-3">Contact Details</h3>
                <p>
                  <i className="fa fa-envelope"></i>
                  <a href="mailto:umrahhajjbd@gmail.com" className="text-blue-500">
                    {" "}
                    umrahhajjbd@gmail.com
                  </a>
                </p>
                <p>
                  <i className="fa fa-phone"></i>
                  <a href="tel:+918585802821" className="text-blue-500">
                    {" "}
                    +88 01777899993
                  </a>
                </p>
                {/* <p>
                  <a
                    href="https://maps.app.goo.gl/C2p3vGedtbsqh2CK8"
                    target="_blank"
                    rel="nofollow"
                    className="text-blue-500"
                  >
                    <i className="fa-solid fa-location-dot"></i> House - 44, Road - 03, Sector - 11, Uttara, Dhaka
                    Dhanmondi, Dhaka
                  </a>
                </p> */}
                <div className="  shadow-md rounded-lg">
                  {/* Permanent Office */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Permanent Office</h3>
                    <p className="text-sm">
                      House # 1550 (5th Floor), Anwar Jong Road <br />
                      Ashulia Bazar, Ashulia, Dhaka-1341
                    </p>
                  </div>

                  {/* Dhaka Office */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Dhaka Office</h3>
                    <p className="text-sm">
                      Nur Islam Mollah Market, 5 No. (MINA Bazar, 2nd Floor) <br />
                      Sujatnagar Pallabi, (Pallabi Metro Station West Side) <br />
                      Mirpur-12, Dhaka-1216
                    </p>
                  </div>
                </div>

                <iframe
                  className="mt-3 w-full h-40"
                  src="https://www.google.com/maps?q=23°49'41.4%22N+90°21'48.1%22E&hl=en&output=embed"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location at 23°49'41.4'N, 90°21'48.1'E"
                />

              </div>
            </div>
          </Containar>
        </section>


      </footer>
      <section className="py-10 bg-black text-white">
        <div class="group text-center">
          ©2024 BD Umrah Hajj Kafela, All rights reserved. Developed by
          <a href="https://okobiz.com/"
            target="_blank"
            rel="noopener noreferrer"
            class="pl-2 font-bold tracking-wider inline-block text-base transition duration-200 ">
            okobiz
          </a>
        </div>
      </section>

    </div>
  );
};

export default Footer;
