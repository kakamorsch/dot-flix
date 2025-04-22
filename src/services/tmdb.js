const TOKEN = process.env.TOKEN

export const fetchMovies = async (titulo = '') => {
  const baseUrl = 'https://api.themoviedb.org/3/'
  let url = titulo
    ? `${baseUrl}search/movie?language=pt-BR&query=${encodeURIComponent(titulo)}`
    : `${baseUrl}discover/movie?language=pt-BR&sort_by=popularity.desc`
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
    })

    if (!response.ok) {
      throw new Error('Erro na requisição: ' + response.statusText)
    }

    const data = await response.json()
    return data.results
  } catch (error) {
    console.error('Erro ao buscar filmes:', error)
  }
}
