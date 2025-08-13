import { Trip, User, Location } from "../types";

const USERS: User[] = [
  {
    id: "user-1",
    name: "Ana Silva",
    avatarUrl: "https://picsum.photos/seed/ana/100/100",
    rating: 4.8,
  },
  {
    id: "user-2",
    name: "Bruno Costa",
    avatarUrl: "https://picsum.photos/seed/bruno/100/100",
    rating: 4.9,
  },
  {
    id: "user-3",
    name: "Carla Dias",
    avatarUrl: "https://picsum.photos/seed/carla/100/100",
    rating: 5.0,
  },
  {
    id: "user-4",
    name: "Daniel Alves",
    avatarUrl: "https://picsum.photos/seed/daniel/100/100",
    rating: 4.7,
  },
];

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const dayAfter = new Date(today);
dayAfter.setDate(dayAfter.getDate() + 2);

const formatDate = (date: Date) => date.toISOString().split("T")[0];

export const MOCK_TRIPS: Trip[] = [
  {
    id: "trip-1",
    origin: { name: "São Paulo, SP, Brasil", lat: -23.5505, lng: -46.6333 },
    destination: {
      name: "Rio de Janeiro, RJ, Brasil",
      lat: -22.9068,
      lng: -43.1729,
    },
    date: formatDate(today),
    time: "08:00",
    price: 120,
    seats: 2,
    driver: USERS[0],
  },
  {
    id: "trip-2",
    origin: {
      name: "Belo Horizonte, MG, Brasil",
      lat: -19.9167,
      lng: -43.9345,
    },
    destination: { name: "Vitória, ES, Brasil", lat: -20.3155, lng: -40.3378 },
    date: formatDate(today),
    time: "07:30",
    price: 90,
    seats: 1,
    driver: USERS[1],
  },
  {
    id: "trip-3",
    origin: { name: "Curitiba, PR, Brasil", lat: -25.4284, lng: -49.2733 },
    destination: {
      name: "Florianópolis, SC, Brasil",
      lat: -27.5954,
      lng: -48.548,
    },
    date: formatDate(tomorrow),
    time: "14:00",
    price: 0,
    seats: 3,
    driver: USERS[2],
  },
  {
    id: "trip-4",
    origin: { name: "São Paulo, SP, Brasil", lat: -23.5505, lng: -46.6333 },
    destination: { name: "Campinas, SP, Brasil", lat: -22.9099, lng: -47.0626 },
    date: formatDate(dayAfter),
    time: "18:00",
    price: 30,
    seats: 2,
    driver: USERS[3],
  },
  {
    id: "trip-5",
    origin: {
      name: "Rio de Janeiro, RJ, Brasil",
      lat: -22.9068,
      lng: -43.1729,
    },
    destination: {
      name: "São Paulo, SP, Brasil",
      lat: -23.5505,
      lng: -46.6333,
    },
    date: formatDate(tomorrow),
    time: "09:00",
    price: 110,
    seats: 1,
    driver: USERS[2],
  },
];
