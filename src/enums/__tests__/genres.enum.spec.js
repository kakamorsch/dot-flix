import { describe, it, expect } from 'vitest'
import { MovieGenres, GenreNames, getGenreName, getGenreId, AllGenres } from '../genres.enum.js'

describe('MovieGenres', () => {
  it('should be frozen (immutable)', () => {
    expect(Object.isFrozen(MovieGenres)).toBe(true)
  })

  it('should contain expected genre keys and values', () => {
    expect(MovieGenres.ACAO).toBe(28)
    expect(MovieGenres.AVENTURA).toBe(12)
    expect(MovieGenres.COMEDIA).toBe(35)
  })

  it('all values should be numbers', () => {
    Object.values(MovieGenres).forEach((value) => {
      expect(typeof value).toBe('number')
    })
  })
})

describe('GenreNames', () => {
  it('should be frozen (immutable)', () => {
    expect(Object.isFrozen(GenreNames)).toBe(true)
  })

  it('should map genre IDs to correct names', () => {
    expect(GenreNames[MovieGenres.ACAO]).toBe('Ação')
    expect(GenreNames[MovieGenres.AVENTURA]).toBe('Aventura')
    expect(GenreNames[MovieGenres.COMEDIA]).toBe('Comédia')
  })
})

describe('getGenreName', () => {
  it('should return correct genre name for known ID', () => {
    expect(getGenreName(MovieGenres.DRAMA)).toBe('Drama')
  })

  it('should return "Desconhecido" for unknown ID', () => {
    expect(getGenreName(99999)).toBe('Desconhecido')
  })
})

describe('getGenreId', () => {
  it('should return correct genre ID for known name', () => {
    expect(getGenreId('Drama')).toBe(MovieGenres.DRAMA)
  })

  it('should return null for unknown name', () => {
    expect(getGenreId('Nome Inexistente')).toBeNull()
  })
})

describe('AllGenres', () => {
  it('should be frozen (immutable)', () => {
    expect(Object.isFrozen(AllGenres)).toBe(true)
  })

  it('should contain objects with id and name matching GenreNames', () => {
    AllGenres.forEach(({ id, name }) => {
      expect(typeof id).toBe('number')
      expect(typeof name).toBe('string')
      expect(GenreNames[id]).toBe(name)
    })
  })
})
