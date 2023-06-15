export interface MenuItem{
    text: string;
    link: string;
}

export interface Alert{
    type?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
    heading?: string;
    text: string;
    spinner?: boolean; 
}

export interface UserDTO {
    id?:number;
    username?: string;
    email: string;
    password: string;
}

export interface LoginMessage{
    message: string;
    status:boolean;
}

export interface Animal{
    id: number;
    name: string;
    breed: string;
    age: string;
    gender: string;
    image: string;
    description: string;
}

export interface Favorite {
    userId: number;
    animalId: number;
}