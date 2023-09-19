import { _mock } from 'src/_mock/_mock';
import { AUTO_URL, BUILDING_URL, EXCLUSIVE_URL } from 'src/config-global';

const history = [
  {
    year: '1983',
    title: 'The Genesis of Kojak Group',
    description:
      'In 1983, a group of visionaries founded the Kojak Group, driven by a fervent ambition to make a lasting impact in the world of Mercedes-Benz. This marked the first chapter in our illustrious history, a history built on a resolute commitment to Mercedes-Benz excellence.',
    coverUrl: '/assets/images/group/kojak-office-tvEffect.webp',
    // coverUrl: '/assets/kojak-logo.svg',
    websiteLink: '#',
  },
  {
    year: '1983',
    title: 'Kojak Spare-Parts - Mercedes-Benz Genuine Parts',
    description:
      'The same year, Kojak Spare-Parts emerged as the embodiment of our commitment to quality and service, specializing exclusively in Mercedes-Benz spare parts. We quickly became a trusted name in the industry, catering to the ever-evolving needs of Mercedes-Benz enthusiasts.',
    coverUrl: '/assets/images/group/spare-parts.webp',
    websiteLink: '#',
    buttonText: 'Search Spare-Parts',
  },
  {
    year: '1983',
    title: 'Kojak Exclusive - Elevating Mercedes-Benz Luxury',
    description:
      'Also in 1983, Kojak Exclusive was established, offering exclusive and premium Mercedes-Benz vehicles. This division set new standards for luxury and sophistication, providing discerning clients with unparalleled Mercedes-Benz experiences',
    coverUrl: '/assets/images/original/font-en.webp',
    websiteLink: EXCLUSIVE_URL,
    buttonText: 'Explore our Inventory',
  },
  {
    year: '1984',
    title: 'Kojak Auto Maintenance - Mercedes-Benz Care',
    description:
      'In 1984, we expanded our offerings with the creation of Kojak Auto Maintenance. This specialized branch was dedicated to ensuring that Mercedes-Benz vehicles not only ran seamlessly but also received the highest standard of care and attention, reflecting our unwavering commitment to Mercedes-Benz excellence.',
    coverUrl: '/assets/images/group/auto.webp',
    websiteLink: AUTO_URL,
    buttonText: 'Book an Appointment',
  },
  {
    year: '1999',
    title: 'Kojak Building - Shaping Spaces, Beyond Mercedes-Benz',
    description:
      'In 1999, Kojak Building added a new dimension to our portfolio. While Mercedes-Benz remained at the heart of our automotive passion, Kojak Building ventured into architectural excellence, shaping skylines and creating spaces that stand as testaments to our commitment to innovation and quality. While this venture extends beyond Mercedes-Benz, it embodies the same spirit of excellence that defines our group.',
    coverUrl: '/assets/images/group/building.webp',
    websiteLink: BUILDING_URL,
    buttonText: 'Find a Space',
  },
];

export const _groupHistory = history.map((group, index) => ({
  id: _mock.id(index),
  year: group.year,
  title: group.title,
  description: group.description,
  coverUrl: group.coverUrl,
  websiteLink: group.websiteLink,
  buttonText: group.buttonText,
}));
