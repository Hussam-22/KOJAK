import { Helmet } from 'react-helmet-async';

import { useLocales } from 'src/locales';
import AboutView from 'src/sections/views/about-view';

export default function AboutPage() {
  const { currentLang } = useLocales();

  const englishData = {
    title: 'About - Kojak Mercedes Auto Repair/Maintenance',
    description:
      'Experience the Difference with Our Mercedes-Benz Repair & Maintenance Services in Sharjah, UAE: Trust Our Skilled Technicians, Genuine Parts, and Unwavering Commitment to Customer Satisfaction.',
    keywords:
      'Mercedes-Benz repair Sharjah, Mercedes-Benz maintenance Sharjah, Mercedes-Benz service center Sharjah, Mercedes-Benz genuine parts Sharjah, Mercedes-Benz repair near me, Mercedes-Benz maintenance near me, Mercedes-Benz service center near me',
    ogTitle: 'About - Kojak Mercedes Auto Repair/Maintenance',
    ogDescription:
      'Experience the Difference with Our Mercedes-Benz Repair & Maintenance Services in Sharjah, UAE: Trust Our Skilled Technicians, Genuine Parts, and Unwavering Commitment to Customer Satisfaction.',
    ogImage: 'https://kojak-auto-maintenance.com/assets/kojak-logo.svg', // Replace with your image URL
    ogUrl: 'https://kojak-auto-maintenance.com/', // Replace with your website URL
  };

  const arabicData = {
    title: 'خبراء إصلاح وصيانة مرسيدس في الشارقة، الإمارات: خدمة من الدرجة الأولى وقطع غيار أصلية',
    description:
      'استمتع بالفرق مع خدمات إصلاح وصيانة مرسيدس الخاصة بنا في الشارقة، الإمارات: ثق في فنيينا المهرة، وقطع الغيار الأصلية، والتزامنا الراسخ برضا العملاء.',
    keywords:
      'إصلاح مرسيدس الشارقة، صيانة مرسيدس الشارقة، مركز خدمة مرسيدس الشارقة، قطع غيار مرسيدس الأصلية الشارقة، إصلاح مرسيدس بالقرب مني، صيانة مرسيدس بالقرب مني، مركز خدمة مرسيدس بالقرب مني',
    ogTitle:
      'خبراء إصلاح وصيانة مرسيدس في الشارقة، الإمارات: خدمة من الدرجة الأولى وقطع غيار أصلية',
    ogDescription:
      'استمتع بالفرق مع خدمات إصلاح وصيانة مرسيدس الخاصة بنا في الشارقة، الإمارات: ثق في فنيينا المهرة، وقطع الغيار الأصلية، والتزامنا الراسخ برضا العملاء.',
    ogImage: 'https://kojak-auto-maintenance.com/assets/kojak-logo.svg', // Replace with your Arabic image URL
    ogUrl: 'https://kojak-auto-maintenance.com/ar', // Replace with your Arabic website URL
  };

  const data = currentLang.value === 'en' ? englishData : arabicData;

  const structuredData = {
    '@context': 'http://schema.org',
    '@type': 'LocalBusiness',
    name: data.title,
    description: data.description,
    url: data.ogUrl,
    image: data.ogImage,
    priceRange: '$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Industrial Area 4, Sharjah, United Arab Emirates',
      addressLocality: 'Sharjah',
      addressRegion: 'AE',
      addressCountry: 'United Arab Emirates',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '25.32918941289578',
      longitude: '55.405793522826315',
    },
    openingHours: '8 AM to 1 PM - 4 PM to 8 PM (Saturday to Thursday)',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+971529242557',
      contactType: 'Customer service',
    },
  };

  return (
    <>
      <Helmet>
        <title>{data.title}</title>
        <meta name="description" content={data.description} />
        <meta name="keywords" content={data.keywords} />
        <meta property="og:title" content={data.title} />
        <meta property="og:description" content={data.description} />
        <meta property="og:image" content={data.ogImage} />
        <meta property="og:url" content={data.ogUrl} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <AboutView />
    </>
  );
}
