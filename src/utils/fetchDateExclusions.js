const EXCL_DATES_PATH = '/dateExclusions.json'

export const fetchDateExclusions = async () => {
  try {
    //`${process.env.PUBLIC_URL}${EXCL_DATES_PATH}` => for local testing
    const response = await fetch(EXCL_DATES_PATH, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    console.log('date EXCLUSIONS>>>>', data)
    if (data?.singleFrom && data.rangeFrom && data.rangeTo) {
      return data
    } else {
      throw new Error('Date exclustions improper format')
    }
  } catch (e) {
    throw new Error('Date exclustions fetch fail')
  }
}
