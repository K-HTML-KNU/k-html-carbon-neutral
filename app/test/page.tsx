'use client' // Add this line at the top

import React from 'react'

const RecipeTest: React.FC = () => {
  const callApi = async () => {
    console.log('Calling API')
    const response = await fetch('/api/recommand-recipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ingredients: ['달걀'],
        isVegan: false,
      }),
    })

    const data = await response.json()
    console.log(data)
  }

  return (
    <div>
      <button onClick={callApi}>Call API</button>
    </div>
  )
}

export default RecipeTest
