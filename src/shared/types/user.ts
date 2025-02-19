// Тип пользователя
export enum UserType {
    STANDARD = 'standard',
    PRO = 'pro',
}

// Пользователь
export interface User {
    name: string; // Обязательное. Мин. длина 1, макс. длина 15 символов
    email: string; // Обязательное, должен быть валидным email
    avatar?: string; // Необязательное. URL изображения, формат .jpg или .png
    password: string; // Обязательное. Мин. длина 6, макс. длина 12 символов
    userType: UserType; // Возможные варианты: обычный (regular) и pro
}


// Комментарий
export interface Comment {
    text: string; // Текст комментария. Обязательное. Мин. длина 5, макс. длина 1024 символа
    date: string; // Дата публикации комментария. Обязательное, хранится в формате ISO строки
    rating: number; // Рейтинг. Число от 1 до 5
    user: User; // Ссылка на автора комментария (например, email пользователя)
}
