import { Helmet } from 'react-helmet-async';

import { useLocales } from 'src/locales';
import CareerListView from 'src/sections/views/career-list-view';

function CareerPage() {
  const { currentLang } = useLocales();

  const englishData = {
    title:
      'Kojak: Your Trusted Destination for Mercedes Auto Repair, Maintenance, Parts, Sales, and Property Solutions in Sharjah, UAE',
    description:
      'Discover excellence at Kojak in Sharjah, UAE, your premier destination for comprehensive Mercedes services. From expert auto repair and maintenance to genuine Mercedes spare parts, we are your one-stop solution. Explore our extensive collection of Mercedes vehicles for sale and take advantage of our flexible leasing and renting options for both commercial and residential spaces. Trust in Kojak for unparalleled quality and service, making us the preferred choice for all your automotive and property needs in the United Arab Emirates',
    keywords:
      'Mercedes Auto Repair, Maintenance, Genuine Parts, Vehicle Sales, Leasing, Renting, Commercial & Residential Spaces by Kojak in Sharjah, UAE',
    ogTitle:
      'Kojak: Your Trusted Destination for Mercedes Auto Repair, Maintenance, Parts, Sales, and Property Solutions in Sharjah, UAE',
    ogDescription:
      'Discover excellence at Kojak in Sharjah, UAE, your premier destination for comprehensive Mercedes services. From expert auto repair and maintenance to genuine Mercedes spare parts, we are your one-stop solution. Explore our extensive collection of Mercedes vehicles for sale and take advantage of our flexible leasing and renting options for both commercial and residential spaces. Trust in Kojak for unparalleled quality and service, making us the preferred choice for all your automotive and property needs in the United Arab Emirates',
    ogImage: 'https://kojakgroup.com/assets/kojak-logo.svg', // Replace with your image URL
    ogUrl: 'https://kojakgroup.com/', // Replace with your website URL
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
    ogImage: 'https://kojakgroup.com/assets/kojak-logo.svg', // Replace with your Arabic image URL
    ogUrl: 'https://kojakgroup.com/ar', // Replace with your Arabic website URL
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
    openingHours: '8 to 8 PM (Saturday to Thursday)',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+97165334312',
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

      <CareerListView />
    </>
  );
}
export default CareerPage;
