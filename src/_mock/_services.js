import { _mock } from 'src/_mock/_mock';

const AutoRepairServices = [
  {
    serviceName: 'Major Service',
    description: `Elevate your Mercedes' performance and longevity with our Major Service package at Kojak. This comprehensive offering covers essential components, including engine oil, oil filter, transmission oil, transmission filter & gasket, spark plugs, A/C filter, and air filter. Our experienced technicians ensure top-quality service, all backed by transparent labor charges. Trust us to keep your Mercedes running at its best.`,
    icon: 'major',
    isDisabled: false,
  },
  {
    serviceName: 'Minor Service',
    description: `Our Minor Service at [Your Shop Name] is all about the details. We replace engine oil, install a fresh oil filter, check tires, inspect brakes, top up fluids, visually inspect components, and reset your service indicator. It's the meticulous care your Mercedes needs for peak performance.`,
    icon: 'minor',
    isDisabled: false,
  },
  // --------------------------------------------------------
  {
    serviceName: 'Oil Change',
    description: 'Regular oil changes are essential to keep your engine running smoothly.',
    icon: 'oil',
    isDisabled: false,
  },
  {
    serviceName: 'Tire Rotation and Balancing',
    description: 'This helps extend the life of your tires and ensures even wear.',
    icon: 'tirebalance',
  },
  {
    serviceName: 'Brake Service',
    description:
      'This includes brake pad replacement, brake fluid flush, and rotor resurfacing or replacement.',
    icon: 'break',
    isDisabled: false,
  },
  {
    serviceName: 'Transmission Service',
    description:
      'This may involve changing the transmission fluid and filter or addressing more significant transmission issues.',
    icon: 'gear',
    isDisabled: false,
  },
  {
    serviceName: 'Engine Tune-Up',
    description:
      'A tune-up can include replacing spark plugs, ignition wires, and other components to improve engine performance.',
    icon: 'engine',
    isDisabled: false,
  },
  {
    serviceName: 'Exhaust System Repair',
    description:
      'This includes fixing or replacing mufflers, catalytic converters, and exhaust pipes.',
    icon: 'exhaust',
    isDisabled: false,
  },
  {
    serviceName: 'Suspension Repair',
    description:
      'Services may involve replacing shocks, struts, control arms, or other suspension components.',
    icon: 'suspension',
    isDisabled: false,
  },
  // {
  //   serviceName: 'Electrical System Repair',
  //   description:
  //     "This covers problems with your vehicle's electrical components, including the battery, alternator, and starter.",
  //   icon: 'power',
  // isDisabled: false,
  // },
  {
    serviceName: 'Air Conditioning Service',
    description:
      'This includes recharging the AC refrigerant, fixing leaks, and repairing or replacing AC components.',
    icon: 'ac',
    isDisabled: false,
  },
  // {
  //   serviceName: 'Cooling System Service',
  //   description:
  //     'This involves maintenance and repair of the radiator, water pump, thermostat, and hoses.',
  //   icon: 'wheel',
  // },
  // {
  //   serviceName: 'Fuel System Service',
  //   description:
  //     'Services may include cleaning fuel injectors, replacing the fuel filter, or addressing fuel pump issues.',
  //   icon: 'wheel',
  // },
  // {
  //   serviceName: 'Check Engine Light Diagnosis',
  //   description:
  //     'Mechanics use diagnostic tools to identify and fix problems indicated by the check engine light.',
  //   icon: 'wheel',
  // },
  {
    serviceName: 'Battery Replacement',
    description: 'When your battery no longer holds a charge, it needs to be replaced.',
    icon: 'batterylight',
  },
  // {
  //   serviceName: 'Tire Repair and Replacement',
  //   description:
  //     'This includes patching punctured tires, fixing flats, or replacing damaged or worn-out tires.',
  //   icon: 'wheel',
  // },
  // {
  //   serviceName: 'Steering System Repair',
  //   description:
  //     'This covers issues with the power steering system, including the pump, hoses, and steering rack.',
  //   icon: 'wheel',
  // },
  {
    serviceName: 'Radiator and Cooling System Repair',
    description: 'Services for addressing issues related to overheating and coolant leaks.',
    icon: 'radiator',
    isDisabled: false,
  },
  {
    serviceName: 'Exterior and Interior Detailing',
    description: "Enhances your vehicle's exterior brilliance and restores its interior freshness",
    icon: 'detailing',
    isDisabled: false,
  },
  {
    serviceName: 'Diagnostics and Computerized Testing',
    description:
      'Using specialized tools to identify and diagnose various issues in modern vehicles.',
    icon: 'chip',
    isDisabled: false,
  },
  {
    serviceName: 'Car Inspection',
    description: 'get free car inspection prior booking online',
    icon: 'solar:clipboard-check-outline',
    price: 'Free',
    isOffer: true,
    isDisabled: false,
  },
  {
    serviceName: 'AC Gas Refill',
    description: 'get cool air in this hot summer, Inspect your AC & get Gas Refill',
    icon: 'ph:fan',
    price: '80 AED',
    isOffer: true,
    isDisabled: false,
  },
  {
    serviceName: 'Break Replacement',
    description: 'Breaks Inspection, Replacement & Resurfacing of break pads',
    icon: 'icon-park-twotone:brake-pads',
    price: '320 AED',
    isOffer: true,
    isDisabled: false,
  },
  {
    serviceName: 'Computer Diagnosis',
    description: 'diagnosis your car computer for any errors and get full report',
    icon: 'solar:cpu-linear',
    price: '100 AED',
    isOffer: true,
    isDisabled: false,
  },
];

export const _autoRepairServices = AutoRepairServices.map((service, index) => ({
  id: _mock.id(index),
  serviceName: service.serviceName,
  description: service.description,
  icon: service.icon,
  isOffer: service?.isOffer || false,
  price: service?.price || undefined,
  isDisabled: service.isDisabled,
}));
