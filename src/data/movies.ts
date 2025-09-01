import { MovieInfo } from '../shared/models/movie-info';

export const mockedMovies: MovieInfo[] = [
    {
        id: 0,
        imageUrl: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=800&auto=format&fit=crop',
        title: 'Inception',
        year: 2010,
        genres: ['Action', 'Sci-Fi', 'Thriller'],
        rating: '8.8',
        duration: '2h 28m',
        description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.'
    },
    {
        id: 1,
        imageUrl: 'https://images.unsplash.com/photo-1616530940355-351fabd9524b?q=80&w=800&auto=format&fit=crop',
        title: 'The Dark Knight',
        year: 2008,
        genres: ['Action', 'Crime', 'Drama'],
        rating: '9.0',
        duration: '2h 32m',
        description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.'
    },
    {
        id: 2,
        imageUrl: 'https://images.unsplash.com/photo-1650475958723-e8d850c26f67?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Interstellar',
        year: 2014,
        genres: ['Adventure', 'Drama', 'Sci-Fi'],
        rating: '8.6',
        duration: '2h 49m',
        description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.'
    },
    {
        id: 3,
        imageUrl: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=800&auto=format&fit=crop',
        title: 'The Shawshank Redemption',
        year: 1994,
        genres: ['Drama'],
        rating: '9.3',
        duration: '2h 22m',
        description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.'
    },
    {
        id: 4,
        imageUrl: 'https://images.unsplash.com/photo-1616530940355-351fabd9524b?q=80&w=800&auto=format&fit=crop',
        title: 'Pulp Fiction',
        year: 1994,
        genres: ['Crime', 'Drama'],
        rating: '8.9',
        duration: '2h 34m',
        description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.'
    },
    {
        id: 5,
        imageUrl: 'https://images.unsplash.com/photo-1650475958723-e8d850c26f67?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'The Matrix',
        year: 1999,
        genres: ['Action', 'Sci-Fi'],
        rating: '8.7',
        duration: '2h 16m',
        description: 'A computer programmer discovers that reality as he knows it is a simulation created by machines, and joins a rebellion to break free.'
    },
];
