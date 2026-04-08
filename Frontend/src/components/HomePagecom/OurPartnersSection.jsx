import googlelogo from "../../assets/googlelog.jpg";
import amazonlogo from "../../assets/amazonlogo.png";
import facebooklogo from "../../assets/facebook.jpg";
import microsoftlogo from "../../assets/Microsoft_logo.png";

const partners = [
  { name: "Google", logo: googlelogo },
  { name: "Amazon", logo: amazonlogo },
  { name: "Facebook", logo: facebooklogo },
  { name: "Microsoft", logo: microsoftlogo },
];

const OurPartnersSection = () => {
  return (
    <div className="py-16 px-6 md:px-16 bg-white dark:bg-gray-900">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
        Our{" "}
        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Partners
        </span>
      </h2>
      <p className="text-center text-gray-500 dark:text-gray-400 mb-12 max-w-xl mx-auto">
        Trusted by the world's leading companies to find great talent.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {partners.map((partner) => (
          <div
            key={partner.name}
            className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 flex items-center justify-center border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <img
              src={partner.logo}
              alt={partner.name}
              className="h-10 object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurPartnersSection;
