import FAQSection from "../HomePagecom/FAQSection";
import FeaturedJobsSection from "../HomePagecom/FeaturedJobsSection";
import FeaturesSection from "../HomePagecom/FeaturesSection";
import HeroSection from "../HomePagecom/Herosec";
import HowItWorksSection from "../HomePagecom/HowItWorksSection";
import JobCategoriesSection from "../HomePagecom/JobCategoriesSection";
import NewsletterSection from "../HomePagecom/NewsletterSection";
import OurPartnersSection from "../HomePagecom/OurPartnersSection";
import TestimonialsSection from "../HomePagecom/Testimonial";

export const ForAllHomePage = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <JobCategoriesSection />
      <FeaturedJobsSection />
      <OurPartnersSection />
      <TestimonialsSection />

      <NewsletterSection />
      <FAQSection />
    </>
  );
};
