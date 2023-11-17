import { Helmet } from 'react-helmet-async';

import { useLocales } from 'src/locales';
import BlogItemView from 'src/sections/views/blog-item-view';

// ----------------------------------------------------------------------

export default function BlogPostPage() {
  const { currentLang } = useLocales();

  const englishData = {
    title:
      'Kojak: Your Trusted Destination for Mercedes Auto Repair/Maintenance,Mercedes Spare Parts, Mercedes Sales, UAE | Our Blog',
    description:
      'Discover excellence at Kojak UAE, your premier destination for comprehensive Mercedes services. From expert auto repair and maintenance to genuine Mercedes spare parts, we are your one-stop solution. Explore our extensive collection of Mercedes vehicles for sale and take advantage of our flexible leasing and renting options for both commercial and residential spaces. Trust in Kojak for unparalleled quality and service, making us the preferred choice for all your automotive and property needs in the United Arab Emirates',
    keywords:
      'Mercedes Auto Repair, Maintenance, Genuine Spare Parts, Vehicle Sales, Leasing, Renting, Commercial & Residential Spaces by Kojak UAE',
    ogTitle:
      'Kojak: Your Trusted Destination for Mercedes Auto Repair/Maintenance,Mercedes Spare Parts, Mercedes Sales, UAE | Our Blog',
    ogDescription:
      'Discover excellence at Kojak UAE, your premier destination for comprehensive Mercedes services. From expert auto repair and maintenance to genuine Mercedes spare parts, we are your one-stop solution. Explore our extensive collection of Mercedes vehicles for sale and take advantage of our flexible leasing and renting options for both commercial and residential spaces. Trust in Kojak for unparalleled quality and service, making us the preferred choice for all your automotive and property needs in the United Arab Emirates',
    ogImage: 'https://kojakgroup.com/assets/kojak-logo.svg',
    ogUrl: 'https://kojakgroup.com/',
  };

  const arabicData = {
    title:
      'كوجاك: وجهتك الموثوقة لتصليح سيارات مرسيدس / الصيانة وقطع غيار مرسيدس الأصلية وبيع سيارات مرسيدس الإمارات العربية المتحدة | تعرف أكثر',
    description:
      'اكتشف التميز في كوجاك بالشارقة، الإمارات العربية المتحدة، وجهتك الأولى للحصول على خدمات مرسيدس الشاملة. من إصلاح وصيانة السيارات الخبراء إلى قطع غيار مرسيدس الأصلية، نحن الحل الشامل لك. استكشف مجموعتنا الواسعة من سيارات مرسيدس للبيع واستفد من خيارات التأجير المرنة الخاصة بنا للمساحات التجارية والسكنية. ثق في كوجاك للحصول على جودة وخدمة لا مثيل لها، مما يجعلنا الخيار الأفضل لجميع احتياجاتك الخاصة بالسيارات والعقارات في الإمارات العربية المتحدة.',
    keywords:
      'إصلاح سيارات مرسيدس، صيانة، قطع غيار أصلية، مبيعات السيارات، تأجير، إيجار، فضاءات تجارية وسكنية بواسطة كوجاك الإمارات العربية المتحدة',
    ogTitle:
      'كوجاك: وجهتك الموثوقة لتصليح سيارات مرسيدس / الصيانة وقطع غيار مرسيدس الأصلية وبيع سيارات مرسيدس الإمارات العربية المتحدة | تعرف أكثر',
    ogDescription:
      'اكتشف التميز في كوجاك بالشارقة، الإمارات العربية المتحدة، وجهتك الأولى للحصول على خدمات مرسيدس الشاملة. من إصلاح وصيانة السيارات الخبراء إلى قطع غيار مرسيدس الأصلية، نحن الحل الشامل لك. استكشف مجموعتنا الواسعة من سيارات مرسيدس للبيع واستفد من خيارات التأجير المرنة الخاصة بنا للمساحات التجارية والسكنية. ثق في كوجاك للحصول على جودة وخدمة لا مثيل لها، مما يجعلنا الخيار الأفضل لجميع احتياجاتك الخاصة بالسيارات والعقارات في الإمارات العربية المتحدة.',
    ogImage: 'https://kojakgroup.com/assets/kojak-logo-arabic.svg', // Replace with your Arabic image URL
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

      <BlogItemView />
    </>
  );
}
