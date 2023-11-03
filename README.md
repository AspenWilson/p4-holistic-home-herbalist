
# Holistic Home Herbalist

The Holistic Home Herbalist is an app that helps those curious about herbalism. User create their own profile witha username and password. Once logged in, users can view all entered herbs (includings their descriptions, properties, warnings, and dosages), recipes (including their directions and ingredients), and properties. Users can also add new herbs and recipes, as well as save herbs and recipes to their profile to reference later. 

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements to successfully set up and run this application:

- Node.js and npm: You need to have Node.js installed on your system to run this application. You can download and install Node.js from the official website: Node.js Downloads.

- Database: Make sure you have a PostgreSQL database set up and running. You'll need to provide the database connection details in the application's configuration.

- Git: You need Git installed on your system to clone the repository and manage the source code. You can download Git from the official website: Git Downloads.

### Installation

1. Clone the project from the GitHub repository:
`$ git clone https://github.com/AspenWilson/p4-holistic-home-herbalist/blob/main` 

2. Navigate to the project directory:
`$ cd p4-holistic-home-herbalist`

3. Install the required dependencies:
`$ pip install -r requirements.txt`



## Usage/Examples

To start using the application, open a terminal or command prompt and navigate to the project's main directory. Once there, enter the following commands:

`$ pipenv install`
`$ pipenv shell`
`$ honcho start -f Procfile.dev`

After you enter the last command, a window should automatically come up with the application's main page. If you haven't created an account, create an account with a username and password. If you're a returning user, enter your username and password. 
![](https://github.com/AspenWilson/p4-holistic-home-herbalist/blob/main/GIFHome.gif)

### Application Pages 

After logging in, you'll be directed to the Home page. Once, there you'll see a navigation bar at the top of the page. Below are the navigation options and what you'll find on each of those pages:

- Profile:
You're profile will house all your saved herbs, saved recipes, entered herbs, entered recipes, and your entered comments. If you ever want to edit or delete an herb or recipes you've entered previously, you can do so from either the 'Entered Herbs' or 'Entered Recipes' tabs in your profile. 

![](https://github.com/AspenWilson/p4-holistic-home-herbalist/blob/main/GIFProfile.gif)

- Herbs:
Here is where you'll find all herbs that have been entered into the database. You can search for a particular herb or you can filter the herbs by property. You can also add a new herb. Clicking on the 'See Details' button at the bottom of each herb card will take you to that herbs' page, where you can see further details on that herb, like a description, warnings, dosages, and what entered recipes that herb is in.  

![](https://github.com/AspenWilson/p4-holistic-home-herbalist/blob/main/GIFHerbs.gif)

- Recipes:
Here you'll find all recipes that have been entered into the database. You can search for a particular recipe or you can filter the recipes by property. You can also add a new recipe. Clicking on the 'See Details' button at the bottom of each recipe card will take you to that recipes' page, where you can see further details on that recipe, like directions, ingredients (including the herbs used and their warnings), and comments that have been left for that recipe. You can also add a comment on this recipe from this page. 

![](https://github.com/AspenWilson/p4-holistic-home-herbalist/blob/main/GIFRecipes.gif)

- Properties:
This is where the full list of all properties can be found. Each property card will have three tabs - one for that property's description, one for a list of entered herbs with that property, and one for a list of entered recipes with that property. Clicking on the herb or recipe name will that you to that herbs' or recipes' page. 

![](https://github.com/AspenWilson/p4-holistic-home-herbalist/blob/main/GIFProperties.gif)

- Logout
Clicking this will log you out of the application and take you to the home page. 



## Support

If you encounter any issues or have questions related to the Holistic Home Herbalist, please feel free to create an issue on the project's GitHub repository.
