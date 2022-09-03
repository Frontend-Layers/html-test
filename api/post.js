import axios from 'axios'

/**
 * POST HTML for validation to API
 *
 * @param {string} body
 * @returns
 */
const post = async (body) => {
  try {
    const response = await axios.post('https://validator.nu/', body, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
      params: {
        'out': 'json'
      }
    })

    return response.data.messages
  }
  catch (err) {
    console.log('[HTML Test] Error: Request Timeout')
  }
}

export { post }