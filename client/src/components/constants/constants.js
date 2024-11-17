import { Link } from "react-router-dom";

export const menuList = [
    {
      title: "Home",
      Link: "/",
    },
    {
      title: "Package",
      Link: "/packages",
      categoryMenu: [
        {
          title: "Basic Package",
          Link: "/package/basic",
          subCategoryMenu:[
            {
                title: "Package 1",
                Link: "/package/basic/1",
            },
            {
                title: "Basic Package 2",
                Link: "/package/basic/2",
            },
            {
                title: "Basic Package 3",
                Link: "/package/basic/3",
            },
          ]
        },
        {
          title: "Standard Package",
          Link: "/package/standard",
          subCategoryMenu:[
            {
                title: "Package 1",
                Link: "/package/basic/1",
            },
            {
                title: "Basic Package 2",
                Link: "/package/basic/2",
            },
            {
                title: "Basic Package 3",
                Link: "/package/basic/3",
            },
          ]
        },
        {
          title: "Premium Package",
          Link: "/package/premium",
        },
      ],
    },
    {
      title: "Membership",
      Link: "/membership",
    },
    {
      title: "Blog",
      Link: "/blog",
    },
    {
      title: "Our Gallery",
      Link: "/our-gallery",
    },
    {
      title: "FAQ's",
      Link: "/faq",
    },
    {
      title: "About Us",
      Link: "/about-us",
    },
    {
      title: "Contact Us",
      Link: "/contact-us",
    },
  ];
  