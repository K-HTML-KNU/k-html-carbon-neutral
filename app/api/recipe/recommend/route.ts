// app/api/ingredient/add/route.ts
import { NextResponse } from 'next/server'

const apiKey = process.env.OPENAI_API_KEY

export async function POST(request: Request) {
  try {
    // const { email, ingredientName } = await request.json()

    if (!apiKey) {
      console.error('API Key is missing')
      return NextResponse.json({ error: 'API Key is missing' }, { status: 500 })
    }

    const apiUrl =
      'https://k-html-team07.openai.azure.com/openai/deployments/Team07/chat/completions?api-version=2024-02-15-preview'

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant.',
          },
          {
            role: 'user',
            content: 'Who won the world series in 2020?',
          },
          {
            role: 'assistant',
            content: 'The Los Angeles Dodgers won the World Series in 2020.',
          },
          {
            role: 'user',
            content: 'What is the capital of California?',
          },
        ],
      }),
    })

    console.log('response', response)

    return NextResponse.json(
      { message: 'Ingredient added to user successfully', response: response },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error adding ingredient:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
