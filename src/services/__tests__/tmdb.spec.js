/* eslint-disable no-undef */
/* eslint-env node */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { fetchMovies } from '../tmdb'
/* global global */

describe('fetchMovies', () => {
  const originalFetch = global.fetch
  const originalToken = process.env.TOKEN

  beforeEach(() => {
    process.env.TOKEN = 'test-token' // Mock TOKEN environment variable
    global.fetch = vi.fn()
  })

  afterEach(() => {
    global.fetch = originalFetch
    process.env.TOKEN = originalToken
  })

  it('fetches movies with query and page', async () => {
    const mockResponse = {
      results: [{ id: 1, title: 'Movie 1' }],
      page: 1,
      total_pages: 10,
    }
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    })

    const result = await fetchMovies('test', 1)
    expect(global.fetch).toHaveBeenCalled()
    expect(result).toEqual(mockResponse)
  })

  it('throws error when response is not ok', async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    })

    await expect(fetchMovies('test', 1)).rejects.toThrow(
      'Erro na requisição: 500 Internal Server Error',
    )
  })

  it('throws error when fetch fails', async () => {
    global.fetch.mockRejectedValue(new Error('Network error'))

    await expect(fetchMovies('test', 1)).rejects.toThrow('Network error')
  })
})
