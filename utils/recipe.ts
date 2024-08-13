type RecipeStep = {
  step: number
  subtitle?: string
  image?: string
  description?: string
}

type Recipe = {
  recipe_name: string
  ingredient: string[]
  serving: number
  difficulty: number
  cooking_time: number
  steps: RecipeStep[]
}

export function parseRecipeString(recipeString: string): Recipe {
  const lines = recipeString
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)

  const recipe: Partial<Recipe> = {}
  const steps: RecipeStep[] = []

  lines.forEach((line) => {
    if (line.startsWith('recipe_name:')) {
      recipe.recipe_name = line.replace('recipe_name:', '').trim()
    } else if (line.startsWith('ingredient:')) {
      recipe.ingredient = line
        .replace('ingredient:', '')
        .trim()
        .split(',')
        .map((item) => item.trim())
    } else if (line.startsWith('serving:')) {
      recipe.serving = parseInt(line.replace('serving:', '').trim(), 10)
    } else if (line.startsWith('difficulty:')) {
      recipe.difficulty = parseInt(line.replace('difficulty:', '').trim(), 10)
    } else if (line.startsWith('cooking_time:')) {
      recipe.cooking_time = parseInt(
        line.replace('cooking_time:', '').trim(),
        10,
      )
    } else if (line.startsWith('step:')) {
      const items = line.split('||').map((item) => item.trim())
      for (let i = 0; i < items.length; i++) {
        if (items[i].startsWith('step:')) {
          const step = parseInt(items[i].replace('step:', '').trim(), 10)
          steps.push({ step })
        } else if (items[i].startsWith('subtitle:')) {
          steps[steps.length - 1].subtitle = items[i]
            .replace('subtitle:', '')
            .trim()
        } else if (items[i].startsWith('image:')) {
          steps[steps.length - 1].image = items[i].replace('image:', '').trim()
        } else if (items[i].startsWith('description:')) {
          steps[steps.length - 1].description = items[i]
            .replace('description:', '')
            .trim()
        }
      }
    }
  })

  recipe.steps = steps

  return recipe as Recipe
}
