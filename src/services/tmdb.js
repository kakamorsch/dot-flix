const TOKEN = process.env.TOKEN

export const fetchMovies = async (query = '', page = 1) => {
  const baseUrl = 'https://api.themoviedb.org/3/'

  let url = query
    ? `${baseUrl}search/movie?language=pt-BR&query=${encodeURIComponent(query)}&page=${page}`
    : `${baseUrl}discover/movie?language=pt-BR&sort_by=popularity.desc&page=${page}`

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return {
      results: data.results,
      page: data.page,
      total_pages: data.total_pages,
    }
  } catch (error) {
    console.error('Erro ao buscar filmes:', error)
    throw error
  }
}
