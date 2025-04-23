export const MovieGenres = Object.freeze({
  ACAO: 28,
  AVENTURA: 12,
  ANIMACAO: 16,
  COMEDIA: 35,
  CRIME: 80,
  DOCUMENTARIO: 99,
  DRAMA: 18,
  FAMILIA: 10751,
  FANTASIA: 14,
  HISTORIA: 36,
  TERROR: 27,
  MUSICA: 10402,
  MISTERIO: 9648,
  ROMANCE: 10749,
  FICCAO_CIENTIFICA: 878,
  CINEMA_TV: 10770,
  THRILLER: 53,
  GUERRA: 10752,
  FAROESTE: 37,
})

export const GenreNames = Object.freeze({
  [MovieGenres.ACAO]: 'Ação',
  [MovieGenres.AVENTURA]: 'Aventura',
  [MovieGenres.ANIMACAO]: 'Animação',
  [MovieGenres.COMEDIA]: 'Comédia',
  [MovieGenres.CRIME]: 'Crime',
  [MovieGenres.DOCUMENTARIO]: 'Documentário',
  [MovieGenres.DRAMA]: 'Drama',
  [MovieGenres.FAMILIA]: 'Família',
  [MovieGenres.FANTASIA]: 'Fantasia',
  [MovieGenres.HISTORIA]: 'História',
  [MovieGenres.TERROR]: 'Terror',
  [MovieGenres.MUSICA]: 'Música',
  [MovieGenres.MISTERIO]: 'Mistério',
  [MovieGenres.ROMANCE]: 'Romance',
  [MovieGenres.FICCAO_CIENTIFICA]: 'Ficção científica',
  [MovieGenres.CINEMA_TV]: 'Cinema TV',
  [MovieGenres.THRILLER]: 'Thriller',
  [MovieGenres.GUERRA]: 'Guerra',
  [MovieGenres.FAROESTE]: 'Faroeste',
})

// Utilitários
export const getGenreName = (genreId) => GenreNames[genreId] || 'Desconhecido'

export const getGenreId = (genreName) => {
  const entry = Object.entries(GenreNames).find(([, name]) => name === genreName)
  return entry ? Number(entry[0]) : null
}

// Opcional: Lista completa para fácil iteração
export const AllGenres = Object.freeze(
  Object.entries(GenreNames).map(([id, name]) => ({
    id: Number(id),
    name,
  })),
)
