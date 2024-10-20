export const parseRecipe = (recipeText) => {
    if (!recipeText) {
        return {
            title: 'Unknown Recipe',
            ingredients: [],
            instructions: [],
            tips: []
        };
    }

    // Regular expressions for different sections
    const titleMatch = recipeText.match(/##\s*(.*?)(\n|\*\*)/);
    const ingredientsMatch = recipeText.match(/\*\*Ingredients:\*\*(.*?)\*\*Instructions:/s);
    const instructionsMatch = recipeText.match(/\*\*Instructions:\*\*(.*?)($|\*\*Tips)/s);
    const tipsMatch = recipeText.match(/\*\*Tips:\*\*(.*)$/s);

    // Parsing ingredients, instructions, and tips
    const ingredients = ingredientsMatch
        ? ingredientsMatch[1]
            .split('*')
            .filter(ingredient => ingredient.trim().length > 0)
            .map(ingredient => ingredient.trim())
        : [];

    const instructions = instructionsMatch
        ? instructionsMatch[1]
            .split(/\d\.\s+/)
            .filter(instruction => instruction.trim().length > 0)
            .map(instruction => instruction.trim())
        : [];

    const tips = tipsMatch
        ? tipsMatch[1]
            .split('*')
            .filter(tip => tip.trim().length > 0)
            .map(tip => tip.trim())
        : [];


    return {
        title: titleMatch ? titleMatch[1].trim() : 'Unknown Recipe',
        ingredients,
        instructions,
        tips
    };
};