'use client' // Add this line at the top

import React from 'react'

const RecipeTest: React.FC = () => {
  const callApi = async () => {
    console.log('Calling API')
    const response = await fetch('/api/recipe/recommend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: 'Who won the world series in 2020?' },
          {
            role: 'assistant',
            content: 'The Los Angeles Dodgers won the World Series in 2020.',
          },
          { role: 'user', content: 'Where was it played?' },
        ],
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
