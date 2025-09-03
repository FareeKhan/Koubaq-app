export const baseUrl = 'https://backend.alkwaityalawl.com/api';
export const SP_KEY =
  'pk_test_51PV9zKFt9d3eerZLogRwve2G5YO4ZUNIUnLCEFpiljRIfKVN7hI7dle16OjcnN2ly7T2vwmB9FWJG0JGzSMCQnNe00k69iWIhI';
export const GOOGLE_API = 'AIzaSyAo2MfsEOJJqEyVA2iQ1xWVWcMQm_NnVV8';
import ApplePayMethod from '../assets/svg/ApplePayMethod.svg';
import CreditCard from '../assets/svg/creditCart.svg';
import CashOn from '../assets/svg/cash.svg';
import Wallet from '../assets/svg/wallet.svg';
import { colors } from './colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const currency = 'SAR';

// export const gccCountries = [
//   {
//     name: 'United Arab Emirates',
//     code: 'AE',
//     flag: 'https://flagcdn.com/w320/ae.png',
//   },
//   {
//     name: 'Saudi Arabia',
//     code: 'SA',
//     flag: 'https://flagcdn.com/w320/sa.png',
//   },
//   {
//     name: 'Kuwait',
//     code: 'KW',
//     flag: 'https://flagcdn.com/w320/kw.png',
//   },
//   {
//     name: 'Qatar',
//     code: 'QA',
//     flag: 'https://flagcdn.com/w320/qa.png',
//   },
//   {
//     name: 'Oman',
//     code: 'OM',
//     flag: 'https://flagcdn.com/w320/om.png',
//   },
//   {
//     name: 'Bahrain',
//     code: 'BH',
//     flag: 'https://flagcdn.com/w320/bh.png',
//   },
// ];

export const Countries = [
  {
    name: 'EN',
    code: 'en',
    flag: 'https://flagcdn.com/w320/us.png',
  },
  {
    name: 'AR',
    code: 'ar',
    flag: 'https://flagcdn.com/w320/sa.png',
  },
];

export const drinks = [
  { id: 1, name: 'Cappuccino' },
  { id: 2, name: 'Espresso' },
  { id: 3, name: 'Latte' },
  { id: 4, name: 'Americano' },
  { id: 5, name: 'Green Tea' },
  { id: 6, name: 'Masala Chai' },
  { id: 7, name: 'Black Tea' },
  { id: 8, name: 'Matcha' },
];

export const extraData = [
  { id: 1, name: 'Foam' },
  { id: 2, name: 'Sugar' },
  { id: 3, name: 'Cookies' },
  { id: 4, name: 'Foam' },
  { id: 5, name: 'Cookies' },
  { id: 6, name: 'Sugar' },
];

export const birthdayWishes = [
  {
    id: 1,
    message: 'Happy Birthday! Wishing you a day filled with love and laughter.',
  },
  { id: 2, message: 'Hope your birthday is as amazing as you are!' },
  {
    id: 3,
    message: 'Wishing you endless happiness and success on your special day.',
  },
  { id: 4, message: 'Have a fantastic birthday and a year full of blessings!' },
  {
    id: 5,
    message: 'May all your dreams come true this year. Happy Birthday!',
  },
  { id: 6, message: 'Cheers to another year of making great memories!' },
  {
    id: 7,
    message: 'Sending you lots of love and good vibes on your birthday.',
  },
  { id: 8, message: 'Enjoy your special day to the fullest — you deserve it!' },
];

export const paymentCards = t => [
  {
    id: 1,
    card: <ApplePayMethod />,
    title: t('applePay'),
  },
  {
    id: 2,
    card: <CreditCard />,
    title: t('creditCard'),
  },
  // {
  //   id: 3,
  //   card: <CashOn />,
  //   title: t('cash'),
  // },
  {
    id: 3,
    card: <Wallet />,
    title: t('wallet'),
  },
];

export const giftFilters = t => [
  {
    id: 1,
    icon: <Ionicons name={'gift'} size={30} color={colors.white} />,
    title: t('gift'),
  },
  {
    id: 2,
    icon: <FontAwesome5 name={'user-alt'} size={24} color={colors.white} />,
    title: t('rcvr'),
  },
  {
    id: 3,
    icon: (
      <MaterialIcons name={'verified-user'} size={25} color={colors.white} />
    ),
    title: t('theme'),
  },
  {
    id: 4,
    icon: <Ionicons name={'card'} size={25} color={colors.white} />,
    title: t('payment'),
  },
];

export const namesData = [
  {
    id: 1,
    title: 'Rock',
    color: '#FFEBEE', // light pink
  },
  {
    id: 2,
    title: 'Peter',
    color: '#E3F2FD', // light blue
  },
  {
    id: 3,
    title: 'John',
    color: '#E8F5E9', // light green
  },
];

export const differentTheme = [
  {
    id: 1,
    name: 'Theme 1',
  },
  {
    id: 2,
    name: 'Theme 2',
  },
  {
    id: 3,
    name: 'Theme 3',
  },
  {
    id: 4,
    name: 'Theme 4',
  },
  {
    id: 5,
    name: 'Theme 5',
  },
  {
    id: 6,
    name: 'Theme 6',
  },
];

export const SentGiftsData = [
  {
    id: 1,
    ProductName: 'Espresso single shot ethiopian beans',
    price: '66.00',
    image: require('../assets/giftCard.png'),
    productImage: require('../assets/cup.png'),
  },
];

export const carNamesArray = [
  { id: 1, name: 'Acura' },
  { id: 2, name: 'Alfa Romeo' },
  { id: 3, name: 'Aston Martin' },
  { id: 4, name: 'Audi' },
  { id: 5, name: 'BMW' },
  { id: 6, name: 'Bentley' }, // fixed spelling
  { id: 7, name: 'Bugatti' },
  { id: 8, name: 'Cadillac' }, // capitalized
  { id: 9, name: 'Chevrolet' },
  { id: 10, name: 'Chrysler' },
  { id: 11, name: 'Citroën' },
  { id: 12, name: 'Dodge' },
  { id: 13, name: 'Ferrari' },
  { id: 14, name: 'Fiat' },
  { id: 15, name: 'Ford' },
  { id: 16, name: 'Genesis' },
  { id: 17, name: 'Honda' },
  { id: 18, name: 'Hyundai' },
  { id: 19, name: 'Infiniti' },
  { id: 20, name: 'Jaguar' },
  { id: 21, name: 'Jeep' },
  { id: 22, name: 'Kia' },
  { id: 23, name: 'Lamborghini' },
  { id: 24, name: 'Land Rover' },
  { id: 25, name: 'Lexus' },
  { id: 26, name: 'Lincoln' },
  { id: 27, name: 'Maserati' },
  { id: 28, name: 'Mazda' },
  { id: 29, name: 'McLaren' },
  { id: 30, name: 'Mercedes-Benz' },
  { id: 31, name: 'Mini' },
  { id: 32, name: 'Mitsubishi' },
  { id: 33, name: 'Nissan' },
  { id: 34, name: 'Pagani' },
  { id: 35, name: 'Peugeot' },
  { id: 36, name: 'Porsche' },
  { id: 37, name: 'Renault' },
  { id: 38, name: 'Rolls-Royce' },
  { id: 39, name: 'Subaru' },
  { id: 40, name: 'Suzuki' },
  { id: 41, name: 'Tesla' },
  { id: 42, name: 'Toyota' },
  { id: 43, name: 'Volkswagen' },
  { id: 44, name: 'Volvo' },
];

export const topUpBalance = [
  {
    id: 1,
    price: '50',
    points: '+10',
  },
  {
    id: 2,
    price: '100',
    points: '+35',
  },
  {
    id: 3,
    price: '250',
    points: '+100',
  },
  {
    id: 4,
    price: '500',
    points: '150',
  },
  {
    id: 5,
    price: '1000',
    points: '250',
  },
];

export const SendingBalance = [
  {
    id: 1,
    price: '500',
  },
  {
    id: 2,
    price: '750',
  },
  {
    id: 3,
    price: '1000',
  },
];

export const transactionData = [
  {
    ref: '568635ZDA',
    msg: '350 SAR was Transferred to 966-50445845',
    dateTime: '7th Feb 2025 at 05:15 PM',
  },
  {
    ref: '568635ZDD',
    msg: '200 SAR was Transferred to 966-50445845',
    dateTime: '9th Feb 2025 at 05:15 PM',
  },
  {
    ref: '568635ZDN',
    msg: '105 SAR was Transferred to 966-50445845',
    dateTime: '14th Feb 2025 at 05:15 PM',
  },
];

export const OrderData = () => [
  {
    orderID: 'CNDFH4215635ZDA',
    status: 1,
    orderDate: '02, Oct, 2024',
    price: '250 AED',
    id: 1,
  },
  {
    orderID: 'CNDFH4215635ZDA',
    status: 2,
    orderDate: '03, Oct, 2024',
    price: '300 AED',
    id: 2,
  },

  {
    orderID: 'CNDFH4215635ZDA',
    status: 1,
    orderDate: '04, Oct, 2024',
    price: '310 AED',
    id: 3,
  },
];

export const shopsData = [
  {
    id: 1,
    name: 'FORMA - Dubai',
    address: '20 KM - Jumeira 3 - Dubai',
    imgPath: require('../assets/shop.png'),
  },
  {
    id: 2,
    name: 'Dips',
    address: '20 KM - Alathar Street - Dubai',
    imgPath: require('../assets/shopImage1.png'),
  },

  {
    id: 3,
    name: 'FORMA - Dubai',
    address: '20 KM - Jumeira 3 - Dubai',
    imgPath: require('../assets/shop.png'),
  },
];


