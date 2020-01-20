import axios from 'axios'

const url = 'http://localhost:5000/api/arsips/'

class ArsipsServices {
  static getArsips () {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url)
        const data = res.data
        resolve(
          data.map(arsip => ({
            ...arsip,
            createdAt: new Date(arsip.cratedAt)
          }))
        )
      } catch (err) {
        reject(err)
      }
    })
  }

  static insertArsip (text) {
    return axios.post(url, {
      text
    });
  }

  static deleteArsip (id) {
    return axios.delete('${url}${id}')
  }
}
