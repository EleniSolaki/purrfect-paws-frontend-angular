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
    id:number;
    username: string;
    email: string;
    password?: string;
}

export interface LoginDTO{
    email: string;
    password: string;
}

export interface RegisterDTO{
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
}

export interface LoginMessage{
    message: string;
    status:boolean;
    id: number;
    username: string;
    email: string;
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

export interface FavoriteAnimal {
    id: number;
    user: UserDTO;
    animal: Animal;
}

export interface Favorite {
    userId: number;
    animalId: number;
}


export interface UserAnimalData {
    email: string;
    name: string;
}


export interface ClaimInterestRequest {
    user: { id: number };
    animal: { id: number };
    comments: string;
    otherPetsAtHome: boolean;
}