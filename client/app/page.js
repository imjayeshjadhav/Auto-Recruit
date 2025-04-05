// app/page.tsx or app/page.jsx

'use client';

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import RecruitmentStatusChart from '@/components/recruitmentChart';
import FeaturesGrid from '@/components/FeaturesGrid';
import Footer from '@/components/Footer';

const Page = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true});
  }, []);

  return (
    <div>
      <section data-aos="fade-up">
        <RecruitmentStatusChart />
      </section>

      <section data-aos="fade-up" data-aos-delay="200">
        <FeaturesGrid />
      </section>

      <section data-aos="fade-up" data-aos-delay="400">
        <Footer />
      </section>
    </div>
  );
};

export default Page;
