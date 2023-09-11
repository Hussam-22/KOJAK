import { _mock } from 'src/_mock/_mock';

const AutoRepairServices = [
  {
    serviceName: 'Major Service',
    description: `Mercedes-Benz Major Maintenance Service, is a comprehensive and thorough maintenance procedure designed to address the more extensive needs of your Mercedes-Benz vehicle. This service is typically recommended at longer intervals than minor services and aims to ensure the vehicle's continued reliability, safety, and performance.`,
    icon: 'major',
    serviceItems: [
      { serviceName: 'engineOil', icon: 'oil' },
      { serviceName: 'transmissionOil', icon: 'gear' },
      { serviceName: 'gasket', icon: 'gasket' },
      { serviceName: 'sparkPlug', icon: 'spark' },
      { serviceName: 'cabinFilter', icon: 'filter' },
      { serviceName: 'airFilter', icon: 'filter' },
      { serviceName: 'tire', icon: 'tire' },
      { serviceName: 'break', icon: 'break' },
      { serviceName: 'battery', icon: 'batterylight' },
      { serviceName: 'inspect', icon: 'inspection' },
      { serviceName: 'Indicator', icon: 'indicator' },
    ],
    isDisabled: false,
  },
  {
    serviceName: 'Minor Service',
    description: `A Mercedes Minor Service is a routine maintenance service specifically designed for Mercedes-Benz vehicles to ensure their optimal performance, safety, and longevity.`,
    icon: 'minor',
    serviceItems: [
      { serviceName: 'engineOil', icon: 'oil' },
      { serviceName: 'tire', icon: 'tire' },
      { serviceName: 'break', icon: 'break' },
      { serviceName: 'battery', icon: 'batterylight' },
      { serviceName: 'inspect', icon: 'inspection' },
      { serviceName: 'Indicator', icon: 'indicator' },
    ],
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
    serviceName: 'Engine Installation',
    description:
      'Seamless engine installation and replacement services. Our technicians provide swift and reliable solutions to keep your vehicle running',
    icon: 'engine-replace',
    isDisabled: false,
  },

  {
    serviceName: 'Suspension Repair',
    description:
      'Services may involve replacing shocks, struts, control arms, or other suspension components.',
    icon: 'suspension',
    isDisabled: false,
  },
  {
    serviceName: 'Electrical System Repair',
    description:
      "This covers problems with your vehicle's electrical components, including the battery, alternator, and starter.",
    icon: 'power',
    isDisabled: false,
  },
  {
    serviceName: 'Air Conditioning Service',
    description:
      'This includes recharging the AC refrigerant, fixing leaks, and repairing or replacing AC components.',
    icon: 'ac',
    isDisabled: false,
  },

  {
    serviceName: 'Battery Replacement',
    description: 'When your battery no longer holds a charge, it needs to be replaced.',
    icon: 'batterylight',
    isDisabled: false,
  },

  {
    serviceName: 'Radiator and Cooling System Repair',
    description: 'Services for addressing issues related to overheating and coolant leaks.',
    icon: 'radiator',
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
    serviceName: 'Tire Rotation and Balancing',
    description: 'This helps extend the life of your tires and ensures even wear.',
    icon: 'tirebalance',
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
  serviceItems: service.serviceItems || [],
}));
