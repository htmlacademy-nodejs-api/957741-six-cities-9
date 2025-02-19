import { User } from './user.js';

// Список городов
export enum CityNames {
    PARIS = 'Paris',
    COLOGNE = 'Cologne',
    BRUSSELS = 'Brussels',
    AMSTERDAM = 'Amsterdam',
    HAMBURG = 'Hamburg',
    DUSSELDORF = 'Dusseldorf'
}

// Располжение
export interface Location {
    latitude: number;
    longitude: number;
}

// Город
export interface City {
    name: CityNames;
    location: Location
}

// Тип удобств
export enum Amenity {
    BREAKFAST = 'breakfast',
    AIR_CONDITIONING = 'air conditioning',
    LAPTOP_FRIENDLY_WORKSPACE = 'laptop friendly workspace',
    BABY_SEAT = 'baby seat',
    WASHER = 'washer',
    TOWELS = 'towels',
    FRIDGE = 'fridge'
}

// Тип жилья
export enum HousingType {
    APARTMENT = 'apartment',
    HOUSE = 'house',
    ROOM = 'room',
    HOTEL = 'hotel'
}

// Предложение по аренде
export interface Offer {
    title: string; // Наименование. Обязательное. Мин. длина 10, макс. длина 100 символов
    description: string; // Описание предложения. Обязательное. Мин. длина 20, макс. длина 1024 символа
    postDate: Date; // Дата публикации предложения. Обязательное. Можно хранить в формате ISO строки
    city: City; // Один из шести городов
    previewImage: string; // Ссылка на изображение-превью
    images: [string, string, string, string, string, string]; // Массив ссылок на фотографии жилья (всегда 6 фотографий)
    isPremium: boolean; // Флаг «Премиум»
    isFavorite: boolean; // Флаг «Избранное»
    rating: number; // Рейтинг. Число от 1 до 5 (с 1 знаком после запятой допускается)
    type: HousingType; // Тип жилья
    rooms: number; // Количество комнат. Мин. 1, Макс. 8
    guests: number; // Количество гостей. Мин. 1, Макс. 10
    price: number; // Стоимость аренды. Мин. 100, Макс. 100000
    amenities: Amenity[]; // Список удобств. Один или несколько вариантов
    user: User; // Ссылка на пользователя (например, email автора)
    commentsCount?: number; // Количество комментариев (рассчитывается автоматически)
    location: Location; // Координаты предложения для аренды
}
