# Fitness Tracker
Description: An app that allows you to log your workouts and log into to access previous logs.

## Event Handler Functions
- `openDropdown(event)` - utilizes `createDropdown` function to open a dropdown menu consisted of `drop` objects inside the `mainMenu` array of objects
- `showCalc(event)` - applies `calorieCard` template to `content` div
- `doCalc(event)` - stores all the values in the `calorieCard` template and outputs the calories you should be eating to maintain your weight when `Calculate Calories` is clicked
- `handleLogin(event)` - calls an alert method that tells the user that they're signed in


## Helper Functions
- `makeElement(el)` - creates an element
- `showForm(type)` - applies log in form template to Log In and Sign Up objects when clickled via function expression
- `createDropdown(a, item)` - adds `drop` objects to a div named dropDown


## Resources
- Font - `Fugaz One` from Google Fonts
- Icon - Created on Canva.com by me
- [Web Calculator I used to check if my math was correct](https://www.calculator.net/calorie-calculator.html)
