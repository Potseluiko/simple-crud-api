const validate = (data) => {
  const { name, age, hobbies } = data

  const validationErrors = []

  if (name === null || name === undefined || name === "") {
    validationErrors.push("Name is required.")
  } else if (typeof name !== "string") {
    validationErrors.push("Name should be a string.")
  }

  if (age === null || age === undefined) {
    validationErrors.push("Age is required.")
  } else if (typeof age !== "number") {
    validationErrors.push("Age should be a number.")
  }

  if (hobbies === null || hobbies === undefined) {
    validationErrors.push("Hobbies is required.")
  } else if (!Array.isArray(hobbies) || !hobbies.every((value) => typeof value === "string" && !!value)) {
    validationErrors.push("Hobbies should be an array of non-empty strings.")
  }

  return validationErrors
}

module.exports = { validate }
