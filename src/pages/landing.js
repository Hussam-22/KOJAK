import { Helmet } from 'react-helmet-async';

import { useLocales } from 'src/locales';
import LandingView from 'src/sections/views/landing-view';

// ----------------------------------------------------------------------

export default function LandingPage() {
  const { currentLang } = useLocales();

  const englishData = {
    title: 'Mercedes Auto Repair & Maintenance Shop in Sharjah, UAE | Your Expert Service Center',
    description:
      'Expert Mercedes auto repair and maintenance services in Sharjah, UAE. Your go-to shop for genuine parts, skilled technicians, and top-notch service.',
    keywords:
      'Mercedes auto repair, Mercedes maintenance, Mercedes service center, genuine Mercedes parts, Sharjah, UAE',
    ogTitle: 'Mercedes Auto Repair & Maintenance Shop in Sharjah, UAE | Your Expert Service Center',
    ogDescription:
      'Expert Mercedes auto repair and maintenance services in Sharjah, UAE. Your go-to shop for genuine parts, skilled technicians, and top-notch service.',
    ogImage: 'https://kojak-auto-maintenance.com/assets/kojak-logo.svg', // Replace with your image URL
    ogUrl: 'https://kojak-auto-maintenance.com/', // Replace with your website URL
  };

  const arabicData = {
    title: 'مركز إصلاح وصيانة مرسيدس في الشارقة، الإمارات | مركز خدمة الخبراء لسياراتك',
    description:
      'خدمات إصلاح وصيانة مرسيدس المتخصصة في الشارقة، الإمارات. متجرك المفضل للقطع الأصلية، والفنيين الماهرين، والخدمة المتميزة.',
    keywords:
      'إصلاح مرسيدس، صيانة مرسيدس، مركز خدمة مرسيدس، قطع غيار مرسيدس الأصلية، الشارقة، الإمارات',
    ogTitle: 'مركز إصلاح وصيانة مرسيدس في الشارقة، الإمارات | مركز خدمة الخبراء لسياراتك',
    ogDescription:
      'خدمات إصلاح وصيانة مرسيدس المتخصصة في الشارقة، الإمارات. متجرك المفضل للقطع الأصلية، والفنيين الماهرين، والخدمة المتميزة.',
    ogImage: 'https://kojak-auto-maintenance.com/assets/kojak-logo.svg', // Replace with your Arabic image URL
    ogUrl: 'https://kojak-auto-maintenance.com/ar', // Replace with your Arabic website URL
  };

  const data = currentLang.value === 'en' ? englishData : arabicData;

  return (
    <>
      <Helmet>
        <title>{data.title}</title>
        <meta name="description" content={data.description} />
        <meta name="keywords" content={data.keywords} />
        <meta property="og:title" content={data.ogTitle} />
        <meta property="og:description" content={data.ogDescription} />
        <meta property="og:image" content={data.ogImage} />
        <meta property="og:url" content={data.ogUrl} />
        <meta property="og:type" content="website" />

        {/* Schema.org JSON-LD Markup */}
        <script type="application/ld+json">
          {`{
          "@context": "http://schema.org",
          "@type": "LocalBusiness",
          "name": "${data.title}",
          "description": "${data.description}",
          "url": "${data.ogUrl}",
          "image": "${data.ogImage}",
          "priceRange": "$",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Industrial Area 4, Sharjah, United Arab Emirates",
            "addressLocality": "Sharjah",
            "addressRegion": "AE",
            "addressCountry": "United Arab Emirates"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "25.32918941289578",
            "longitude": "55.405793522826315"
          },
          "openingHours": "8 AM to 1 PM - 4 PM to 8 PM (Saturday to Thursday)",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+971529242557",
            "contactType": "Customer service"
          }
        }`}
        </script>
      </Helmet>

      <LandingView />
    </>
  );
}
