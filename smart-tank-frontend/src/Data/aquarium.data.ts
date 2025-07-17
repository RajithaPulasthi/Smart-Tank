import StoreImage from '../assets/StoreImage.png'

export interface AquariumData {
    id: string;
    name: string;
    rating: number;
    reviews: number;
    address: string;
    bannerImage: string;
    phone: string;
    email: string;
    hours: {
      monToSat: string;
      sun: string;
    };
    description: string;
    socials: {
      facebook: string;
      instagram: string;
      whatsapp: string;
      tiktok: string;
    };
    tabs: string[];
  }
  
  export const aquariums: AquariumData[] = [
    {
      id: 'blue-aqua-pets',
      name: 'Blue Aqua Pets',
      rating: 4.2,
      reviews: 640,
      address: 'No.01 High Level Road, Panagoda, Homagama, Western 10200',
      bannerImage: StoreImage,
      phone: '011-4564545',
      email: 'hello@blueaquapets.lk',
      hours: {
        monToSat: '10:00 AM – 7:00 PM',
        sun: '10:00 AM – 5:00 PM',
      },
      description:
        'At Blue Aqua Pets, we bring passion for aquatics to your living room. Specializing in vibrant freshwater fish like tetras, gouramis, and barbs, we also offer aquascaping tips and free beginner advice.',
      socials: {
        facebook: '#',
        instagram: '#',
        whatsapp: '#',
        tiktok: '#',
      },
      tabs: ['About us', 'Fish List', 'Accessories', 'Fish Food', 'Fish Care'],
    },
    {
      id: 'aqua-paradise',
      name: 'Aqua Paradise',
      rating: 4.7,
      reviews: 482,
      address: 'No.15 Main Street, Nugegoda, Colombo 05',
      bannerImage: StoreImage,
      phone: '011-7894561',
      email: 'info@aquaparadise.lk',
      hours: {
        monToSat: '9:00 AM – 6:30 PM',
        sun: 'Closed',
      },
      description:
        'Aqua Paradise is a premium destination for exotic fish, planted tanks, and imported tank gear. Trusted by hobbyists across the city.',
      socials: {
        facebook: '#',
        instagram: '#',
        whatsapp: '#',
        tiktok: '#',
      },
      tabs: ['About us', 'Fish List', 'Gallery', 'Reviews', 'Contact'],
    },
    {
      id: 'deep-sea-creations',
      name: 'Deep Sea Creations',
      rating: 4.5,
      reviews: 390,
      address: 'No.78 Marine Drive, Dehiwala, Colombo 06',
      bannerImage: StoreImage,
      phone: '011-2349876',
      email: 'deepsea@aquacreations.lk',
      hours: {
        monToSat: '10:30 AM – 6:00 PM',
        sun: '11:00 AM – 4:00 PM',
      },
      description:
        'Deep Sea Creations offers one of the best marine fish collections in Sri Lanka. We also provide saltwater tank design & setup consultations.',
      socials: {
        facebook: '#',
        instagram: '#',
        whatsapp: '#',
        tiktok: '#',
      },
      tabs: ['About us', 'Marine Fish', 'Equipment', 'Saltwater Care', 'FAQs'],
    },
    {
      id: 'aquahut',
      name: 'AquaHut',
      rating: 4.0,
      reviews: 210,
      address: 'No.32 River Side Lane, Kandy',
      bannerImage: StoreImage,
      phone: '081-2233445',
      email: 'aquahut@kandy.lk',
      hours: {
        monToSat: '9:30 AM – 6:00 PM',
        sun: 'Closed',
      },
      description:
        'From nano tanks to community aquariums, AquaHut provides the most affordable aquatic solutions in Kandy with expert care tips.',
      socials: {
        facebook: '#',
        instagram: '#',
        whatsapp: '#',
        tiktok: '#',
      },
      tabs: ['About us', 'Fish List', 'Aquarium Kits', 'Services', 'Contact'],
    },
    {
      id: 'tankworld-lk',
      name: 'TankWorld LK',
      rating: 4.3,
      reviews: 510,
      address: 'No.09 Lake Road, Kurunegala',
      bannerImage: StoreImage,
      phone: '037-5566778',
      email: 'sales@tankworld.lk',
      hours: {
        monToSat: '10:00 AM – 6:00 PM',
        sun: '10:00 AM – 3:00 PM',
      },
      description:
        'TankWorld LK supplies both freshwater and pond fish. Also known for bulk deals, commercial tanks, and accessories.',
      socials: {
        facebook: '#',
        instagram: '#',
        whatsapp: '#',
        tiktok: '#',
      },
      tabs: ['About us', 'Fish List', 'Bulk Orders', 'Events', 'Contact'],
    },
  ];
  