import { useParams } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect, useCallback } from 'react';

import { PAGE_VISIT } from 'src/config-global';
import { useAuthContext } from 'src/auth/hooks';
import getPartDescription from 'src/sections/components/getPartDescription';
import SparePartDetailsView from 'src/sections/views/spare-part-details-view';

// ----------------------------------------------------------------------

export default function SparePartDetailsPage() {
  const { partDocID } = useParams();
  const { fsGetPartDetails, fsUpdatePartStatistics } = useAuthContext();
  const [partDetails, setPartDetails] = useState({});

  useEffect(() => {
    (async () => {
      setPartDetails(await fsGetPartDetails(partDocID));
    })();
  }, [fsGetPartDetails, partDocID]);

  useEffect(() => {
    (async () => {
      if (partDetails.docID) await fsUpdatePartStatistics(partDetails.docID, PAGE_VISIT);
    })();
  }, [fsUpdatePartStatistics, partDetails]);

  const imgUrl =
    partDetails.imgUrl === undefined
      ? '/assets/illustrations/part-unavailable.svg'
      : partDetails.imgUrl;

  const partNumber = partDetails?.partNumber || '';
  const partName = partDetails?.description || '';

  const productDescription = getPartDescription(partDetails);

  return (
    <>
      <Helmet>
        <title>Mercedes Spare Part Details - Kojak Spare Parts</title>
        <meta name="description" content={productDescription} />
        <meta
          name="keywords"
          content="Mercedes spare part details, Genuine Mercedes parts, part description, part weight, part availability, Kojak Spare Parts, auto spare parts"
        />
        <meta property="og:title" content="Mercedes Spare Part Details - Kojak Spare Parts" />
        <meta property="og:description" content={productDescription} />
        <meta property="og:image" content={imgUrl} />
        <meta
          property="og:url"
          content={`https://www.kojak-spareparts.com/spar-parts/${partDocID}`}
        />
        <meta property="og:type" content="article" />

        {/* Schema.org JSON-LD Markup */}
        <script type="application/ld+json">
          {`//<![CDATA[
      {
        "@context": "http://schema.org",
        "@type": "Product",
        "name": "${partNumber} - ${partName}",
        "description": "${productDescription}",
        "brand": {
          "@type": "Brand",
          "name": "Mercedes"
        },
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/InStock",
          "url": "https://www.kojak-spareparts.com/spar-parts/${partDocID}",
        }
      }
    //]]>`}
        </script>
      </Helmet>

      <SparePartDetailsView productDescription={productDescription} partDetails={partDetails} />
    </>
  );
}
