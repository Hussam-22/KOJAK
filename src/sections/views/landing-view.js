import { useState } from 'react';

import { Container } from '@mui/material';

import { blogPosts } from 'src/_mock';
import FAQs from 'src/sections/landing/Faqs';
import Offers from 'src/sections/landing/Offers';
import GroupAd from 'src/sections/landing/GroupAd';
import Services from 'src/sections/landing/Services';
import LatestPosts from 'src/sections/blog/latest-posts';
import LandingHero from 'src/sections/landing/LandingHero';
import LandingAbout from 'src/sections/landing/LandingAbout';
import JoinNewsletter from 'src/sections/about/join-newsletter';
import LandingTestimonial from 'src/sections/testimonial/about-testimonial';
import BookAppointmentDialog from 'src/components/Dialog/bookAppointmentDialog';

export default function LandingView() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    console.log('clicked');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <LandingHero openAppointmentDialog={handleClickOpen} />
      <Services />
      <Offers />
      <LandingAbout />
      <LandingTestimonial />
      <FAQs />
      <GroupAd />
      <LatestPosts posts={blogPosts.slice(0, 6)} />
      <JoinNewsletter />
      <BookAppointmentDialog open={open} handleClose={handleClose} />
    </>
  );
}
