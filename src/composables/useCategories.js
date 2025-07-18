export const useCategories = () => {
  const getColor = (value) => {
    const categoryColor = {
      grocery: '#d5a6bd',
      spare_time: '#d9ead3',
      clothes: '#d9d2e9',
      extraordinary: '#cfe2f3',
      health: '#d5a6bd',
      fuel: '#ead1dc',
      mobility: '#b4a7d6',
      salary: '#ffe599',
      insurance: '#fce5cd',
      rent: '#c27ba0',
      abonnement: '#f9cb9c',
      electricity: '#ea9999',
      travel: '#9fc5e8',
      business: '#a2c4c9',
      rubbish: '#b6d7a8',
      communication: '#eeeeee',
      new: ' #d7bde2',
    }

    return categoryColor[value]
  }

  return { getColor }
}
