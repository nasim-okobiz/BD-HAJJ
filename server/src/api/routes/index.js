const AuthRouter = require("./auth.route.js");
const BannerRouter = require("./banner.route.js");
const AboutUsRouter = require("./aboutUs.route.js");
const ImageGalleryRoute = require("./image.gallery.route.js");
const VideoGalleryRoute = require("./video.gallery.route.js");
const FAQRoute = require("./FAQ.route.js");
const BlogCategoryRoute = require("./blog.category.route.js");
const BlogRoute = require("./blog.route.js");
const ContactUsRoute = require("./contact.us.route.js");
const ContactInfoRoute = require("./contact.info.route.js");
const PackageTypeRoute = require("./package.type.route.js");
const PackageRoute = require("./package.route.js");
const PersonRoute = require("./person.route.js");
const BookingRoute = require("./booking.route.js");
const MembershipRoute = require("./membership.route.js");
const JoinUsRoute = require("./join.us.route.js");
const PaymentRoute = require("./payment.route.js");
const PolicyRoute = require("./policy.route.js");
const NoticeRoute = require("./notice.route.js");

const { Router } = require("express");

const rootRouter = Router();

rootRouter.use('/auth', AuthRouter);
rootRouter.use('/banner', BannerRouter);
rootRouter.use('/about-us', AboutUsRouter);
rootRouter.use('/image-gallery', ImageGalleryRoute);
rootRouter.use('/video-gallery', VideoGalleryRoute);
rootRouter.use('/faq', FAQRoute);
rootRouter.use('/blog-category', BlogCategoryRoute);
rootRouter.use('/blog', BlogRoute);
rootRouter.use('/contact-us', ContactUsRoute);
rootRouter.use('/contact-info', ContactInfoRoute);
rootRouter.use('/package-type', PackageTypeRoute);
rootRouter.use('/package', PackageRoute);
rootRouter.use('/person', PersonRoute);
rootRouter.use('/booking', BookingRoute);
rootRouter.use('/membership', MembershipRoute);
rootRouter.use('/join-us', JoinUsRoute);
rootRouter.use('/payment', PaymentRoute);
rootRouter.use('/policy', PolicyRoute);
rootRouter.use('/notice', NoticeRoute);

module.exports = rootRouter;

