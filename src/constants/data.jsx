// export const mainUrl = 'https://backend.onway.ae/';
export const mainUrl = 'https://backend.koubak.info/';

// export const ImageBaseUrl = 'https://backend.onway.ae';
export const ImageBaseUrl = 'https://backend.koubak.info';

export const baseUrl = `${mainUrl}api/`;
export const imageUrl = `${mainUrl}uploads/`;
export const STRIPE_KEY = "pk_test_51SOZA0COzbE7fBAMwRoi2wspVojLIK9SiqI9I7DJUrYNpwCcdUQs3bUPWRPu11R8CmPGBpDullGI5e7liLrOtXzh00R4HTUs0u"


export const GOOGLE_API = 'AIzaSyBJVhlenAMsRkF2yHARSey2mtIFEW2_rfo';
import ApplePayMethod from '../assets/svg/ApplePayMethod.svg';
import CreditCard from '../assets/svg/creditCart.svg';
import Wallet from '../assets/svg/wallet.svg';
import { colors } from './colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const currency = 'SAR';

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
    points: '+150',
  },
  {
    id: 5,
    price: '1000',
    points: '+250',
  },
];

export const SendingBalance = [
  {
    id: 1,
    price: '100',
  },
  {
    id: 2,
    price: '500',
  },
  {
    id: 3,
    price: '1000',
  },
];









